import React, { useState } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Dashboard from './components/Dashboard';
import DataTable from './components/DataTable';
import Form from './components/Form';
import Header from './components/Header';
import UserContext from './context/UserContext';
import Login from './components/Login';
import APIClient from './utils/ApiClient';
import ProductController from './controllers/ProductController';
import FileAPI from './utils/FileAPI';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  if (!userToken) {
    return (<UserContext.Provider value={{ userToken, setUserToken }}>
      <Login isLoading={isLoading} setIsLoading={setIsLoading} />
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </UserContext.Provider>);
  }
  const apiClient = new APIClient(process.env.REACT_APP_API_URL, userToken);
  const fileApi = new FileAPI(process.env.REACT_APP_API_URL, userToken);
  const productController = new ProductController(apiClient);

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      <CssBaseline />
      <Header />
      <Container>
        <Switch>
          <Route path="/admin/" exact>
            <Dashboard apiClient={apiClient} />
          </Route>
          <Route path="/admin/products">
            <DataTable controller={productController} />
          </Route>
          <Route path="/admin/product/create">
            <Form controller={productController} fileApi={fileApi} create />
          </Route>
          <Route path="/admin/product/:id">
            <Form controller={productController} fileApi={fileApi} />
          </Route>
          <Route path="/admin/categories">
            Categories
          </Route>
          <Route path="/admin/orders">
            Orders
          </Route>
        </Switch>
      </Container>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </UserContext.Provider>
  );
}

export default App;
