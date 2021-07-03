import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Dashboard = ({ apiClient }) => {
  const [orders, setOrders] = useState();
  const classes = useStyles();
  
  useEffect(() => {
    apiClient.getData('order').then(orders => setOrders(orders)).catch(err => console.error(err));
  }, [apiClient]);
  console.log('ORDER', orders);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.user.firstName}
              </TableCell>
              <TableCell align="right">{row.user.lastName}</TableCell>
              <TableCell align="right">{row.user.email}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Dashboard;
