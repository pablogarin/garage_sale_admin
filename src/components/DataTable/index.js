import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  row: {
    cursor: 'pointer',
  },
  addBtn: {
    position: 'fixed',
    bottom: 20,
    right: 20
  }
});

const DataTable = ({ controller }) => {
  const [data, setData] = useState();
  const classes = useStyles();
  const history = useHistory();
  
  useEffect(() => {
    controller.getData().then(data => {
      console.log(data)
      setData(data)
    }).catch(err => console.error(err));
  }, [controller]);

  const editRow = (id) => {
    history.push(controller.getEditURL(id));
  }

  const goToAdd = (id) => {
    history.push(controller.getCreateURL());
  }

  const getValue = (data, key, field) => {
    if (field.type === 'select') {
      const optionSelected = field.options.find(({ value }) => data[key] && value === data[key].id);
      if (optionSelected) {
        return optionSelected.label;
      }
      return '';
    }
    return data[key];
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.entries(controller.fields).map(([key, value]) => (
                <TableCell key={key}>{value.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => editRow(row.id)}
                hover
                className={classes.row}
              >
                {Object.entries(controller.fields).map(([key, value]) => (
                  <TableCell key={key} component="th" scope="row">
                    {getValue(row, key, value)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        className={classes.addBtn}
        color="primary"
        onClick={goToAdd}
      >
        <AddIcon />
      </Fab>
    </>
  )
}

export default DataTable;
