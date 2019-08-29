import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Auth from 'services/auth';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoutButton: {
    marginLeft: 'auto',
  }
}));

function Titlebar() {
  const { t } = useTranslation();
  const classes = useStyles({});

  const handleLogout = useCallback(async () => {
    await Auth.logout();
  }, []);

  const jwtToken = localStorage.getItem('jwtToken'); // TODO: isAuthenticated from state instead localstorage

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Fanatics Map Admin
        </Typography>

        {jwtToken && <Button variant="contained" color="default" type="button" onClick={handleLogout} className={classes.logoutButton}>{t('global.logout')}</Button>}
      </Toolbar>
    </AppBar>
  );
}

export default Titlebar;
