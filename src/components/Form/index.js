import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20
  },
  buttons: {
    marginTop: 20,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  }
}));

const Form = ({ controller, fileApi, create }) => {
  const [data, setData] = React.useState(null);
  const [files, setFiles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { id } = useParams();
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    const getFormData = async () => {
      const data = await controller.getData(id);
      setData(data);
    }
    if (id && !data) {
      getFormData();
    }
  }, [controller, id, data]);

  const handleChange = (key, newValue) => {
    const value = controller.getValue(key, newValue);
    setData(data => ({ ...data, [key]: value }))
  }

  const onCancel = () => {
    history.goBack();
  }

  const onSave = async () => {
    setIsLoading(true);
    try {
      const uploads = await uploadFiles();
      const dataToSave = { ...data, ...uploads };
      if (data.id) {
        delete dataToSave['id'];
        await controller.update(data.id, dataToSave);
      } else {
        await controller.create(dataToSave);
      }
      setIsLoading(false);
      history.goBack();
    } catch (e) {
      alert(`Error while saving: ${e}`);
      setIsLoading(false);
    }
  }

  const handleFileChange = (e, key) => {
    const newFiles = e.target.files
    setData(data => ({ ...data, [key]: [...newFiles] }));
    setFiles(files => ([...files, key]));
  }

  const uploadFiles = async () => {
    if (files.length > 0) {
      const paths = await Promise.all(files.map(async key => {
        const filePath = await fileApi.upload(data[key]);
        if (controller.fields[key] === 'file') {
          return [key, filePath[0]];
        }
        return [key, filePath];
      }))
      return Object.fromEntries(paths);
    }
  }

  const getInput = (key, field) => {
    if (field.type === 'file' || field.type === 'multifile') {
      return (
        <FormControl fullWidth align="left">
          <FormLabel htmlFor={`form-${key}`}>{field.label}</FormLabel>
          <Input
            id={`form-${key}`}
            type="file"
            value=''
            onChange={(e) => handleFileChange(e, key)}
            inputProps={{ multiple: field.type === 'multifile' }}
          />
        </FormControl>
      );
    }
    if (field.type === 'select') {
      return (
        <FormControl fullWidth align="left">
          <InputLabel id={`${key}-select-label`}>{field.label}</InputLabel>
          <Select
            labelId={`${key}-select-label`}
            id={`${key}-select`}
            value={data && data[key]}
            onChange={(e) => handleChange(key, e.target.value)}
          >
            { field.options.map((option) => (
              <MenuItem value={option.value}>{option.label}</MenuItem>
            )) }
          </Select>
        </FormControl>
      );
    }
    return (
      <TextField
        id={key}
        label={field.label}
        value={data && data[key]}
        onChange={(e) => handleChange(key, e.target.value)}
        fullWidth
      />
    );
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper className={classes.root}>
        <Box p={4}>
          <form>
            <Grid
              container
              justify="space-between"
              align="center"
              alignItems="center"
              spacing={2}
            >
              {controller.fields && Object.entries(controller.fields).map(([key, value]) => (
                <Grid item xs={12} key={key}>
                  {getInput(key, value)}
                </Grid>
              ))}
            </Grid>
            <Grid
              container
              justify="space-evenly"
              align="center"
              alignItems="center"
              spacing={2}
              className={classes.buttons}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={onCancel}
              >
                <ArrowBackOutlinedIcon />
                &nbsp;Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={onSave}
              >
                <SaveOutlinedIcon />
                &nbsp;Save
              </Button>
            </Grid>
          </form>
        </Box>
      </Paper>
    </>
  )
}

export default Form;
