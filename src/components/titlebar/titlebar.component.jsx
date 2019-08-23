import React, { useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import MenuIcon from '@material-ui/icons/Menu';



import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Auth from 'services/auth';

// {jwtToken && (
//   <button type="button" onClick={handleLogout}>Wyloguj sie</button>
// )}

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoutButton: {
    marginLeft: 'auto',
  }
}));

function Titlebar() {
  const classes = useStyles({});

  const handleLogout = useCallback(async () => {
    await Auth.logout();
  }, []);

  const jwtToken = localStorage.getItem('jwtToken'); // TODO: isAuthenticated from state instead localstorage

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          UltrasMap Admin
        </Typography>

        {jwtToken && <Button variant="contained" color="default" type="button" onClick={handleLogout} className={classes.logoutButton}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
}

export default Titlebar;
