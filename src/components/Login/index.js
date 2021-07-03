import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlertDialog from '../AlertDialog';
import UserContext from '../../context/UserContext';
import LoginClient from '../../utils/loginClient';

const loginClient = new LoginClient(process.env.REACT_APP_API_URL)

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const sessionTokenKey = 'session.token';

export default function Login({ isLoading, setIsLoading }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const token = localStorage.getItem(sessionTokenKey);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();

  const { userToken, setUserToken } = useContext(UserContext);

  useEffect(() => {
    const validateSession = async () => {
      setIsLoading(true);
      try {
        await loginClient.validate(token);
        setUserToken(token);
      } catch (err) {
        console.error(err);
        localStorage.removeItem(sessionTokenKey)
        setUserToken(null);
      } finally {
        setIsLoading(false);
      }
    }
    if (token) {
      validateSession();
    }
  }, [token, userToken, setIsLoading, setUserToken]);

  const login = async (evt) => {
    if (evt) {
      evt.preventDefault();
      if (isLoading || userToken) return false;
      if (!user || !password) {
        setErrorMessage("You must provide a username and password.");
      }
      setIsLoading(true);
      try {
        const token = await loginClient.login(user, password);
        console.log('TOKEN', token);
        setUserToken(token);
        localStorage.setItem(sessionTokenKey, token);
      } catch (err) {
        setErrorMessage("Couldn't login. Check your credentials and try again.");
        console.error(err)
      } finally {
        setIsLoading(false);
      }
    }
    return false;
  }

  return (
    <>
      {errorMessage && (
        <AlertDialog message={errorMessage} closeAlert={() => setErrorMessage('')} />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={(evt) => login(evt)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="User"
              name="user"
              autoComplete="user"
              value={user}
              autoFocus
              onChange={(evt) => setUser(evt.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => login()}
            >
              Sign In
            </Button>
          </form>
        </div>  
      </Container>
    </>
  );
}
