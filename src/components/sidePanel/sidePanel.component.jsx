import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircle from '@material-ui/icons/AddCircle';
import GroupWork from '@material-ui/icons/GroupWork';
import Feedback from '@material-ui/icons/Feedback';
import Notifications from '@material-ui/icons/Notifications';
import Backup from '@material-ui/icons/Backup';

import NavigationHOC from 'common/navigationHOC/navigationHOC.component';
import Auth from 'services/auth';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  listItemIcon: {
    minWidth: '40px',
  },
  sideMenu: {
    minHeight: 'calc(100vh - 64px)',
    height: '100%',
  },
});

function SidePanel() {
  const classes = useStyles({});

  return (
    <Paper square className={classes.sideMenu}>
      <div
        className={classes.fullList}
        role="presentation"
      >
        <List>
          {Auth.hasCredentialLocal('getUser') && (
            <NavigationHOC to="/users">
              {(pathname, handleClick) => (
                <ListItem button onClick={handleClick} selected={pathname === '/users'}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItem>
              )}
            </NavigationHOC>
          )}
          {Auth.hasCredentialLocal('updateUser') && (
            <NavigationHOC to="/users/new">
              {(pathname, handleClick) => (
                <ListItem button onClick={handleClick} selected={pathname === '/users/new'}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <AddCircle />
                  </ListItemIcon>
                  <ListItemText primary="Add user" />
                </ListItem>
              )}
            </NavigationHOC>
          )}
        </List>
        <Divider />
        <List>
          {Auth.hasCredentialLocal('getClub') && (
            <NavigationHOC to="/clubs">
              {(pathname, handleClick) => (
                <ListItem button onClick={handleClick} selected={pathname === '/clubs'}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <GroupWork />
                  </ListItemIcon>
                  <ListItemText primary="Clubs" />
                </ListItem>
              )}
            </NavigationHOC>
          )}
          {Auth.hasCredentialLocal('updateClub') && (
            <NavigationHOC to="/clubs/new">
              {(pathname, handleClick) => (
                <ListItem button onClick={handleClick} selected={pathname === '/clubs/new'}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <AddCircle />
                  </ListItemIcon>
                  <ListItemText primary="Add club" />
                </ListItem>
              )}
            </NavigationHOC>
          )}
        </List>
        <Divider />

        {Auth.hasCredentialLocal('getSuggestion') && (
          <>
            <List>
              <NavigationHOC to="/suggestions">
                {(pathname, handleClick) => (
                  <ListItem button onClick={handleClick} selected={pathname === '/suggestions'}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <Feedback />
                    </ListItemIcon>
                    <ListItemText primary="Suggestions" />
                  </ListItem>
                )}
              </NavigationHOC>
            </List>
            <Divider />
          </>
        )}
        
        {Auth.hasCredentialLocal('getActivity') && (
          <>
            <List>
              <NavigationHOC to="/activities">
                {(pathname, handleClick) => (
                  <ListItem button onClick={handleClick} selected={pathname === '/activities'}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <Notifications />
                    </ListItemIcon>
                    <ListItemText primary="Activities" />
                  </ListItem>
                )}
              </NavigationHOC>
            </List>
            <Divider />
          </>
        )}

        {Auth.hasCredentialLocal('getBackup') && (
          <>
            <List>
              <NavigationHOC to="/backups">
                {(pathname, handleClick) => (
                  <ListItem button onClick={handleClick} selected={pathname === '/backups'}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <Backup />
                    </ListItemIcon>
                    <ListItemText primary="Backups" />
                  </ListItem>
                )}
              </NavigationHOC>
            </List>
            <Divider />
          </>
        )}
      </div>
    </Paper>
  );
}

export default SidePanel;
