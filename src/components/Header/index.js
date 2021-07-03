import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from '../../context/UserContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setUserToken } = useContext(UserContext);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem('session.token');
  }

  const toggleMenu = (state=null, event) => {
    if (event && (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))) {
      return;
    }
    if (typeof state === 'boolean') {
      setIsMenuOpen(state);
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Admin
          </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={isMenuOpen}
        onClose={(event) => toggleMenu(false, event)}
      >
        <List>
          <ListItem button onClick={() => toggleMenu(false)}>
            <Link to="/admin/">
              <Typography variant="subtitle1">Dashboard</Typography>
            </Link>
          </ListItem>
          <ListItem button onClick={() => toggleMenu(false)}>
            <Link to="/admin/products">
              <Typography variant="subtitle1">Products</Typography>
            </Link>
          </ListItem>
          <ListItem button onClick={() => toggleMenu(false)}>
            <Link to="/admin/categories">
              <Typography variant="subtitle1">Categories</Typography>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  )
}

export default Header;
