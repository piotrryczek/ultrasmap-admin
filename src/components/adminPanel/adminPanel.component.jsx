import React from 'react';
import { Switch, Redirect, Route } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouteAuth from 'components/routeAuth/routeAuth.component';

import Titlebar from 'components/titlebar/titlebar.component';
import SidePanel from 'components/sidePanel/sidePanel.component';

import LoadingOverlay from 'components/loadingOverlay/loadingOverlay.component';
import Clubs from 'components/clubs/clubs.component';
import Club from 'components/club/club.component';
import Users from 'components/users/users.component';
import User from 'components/user/user.component';
import Suggestions from 'components/suggestions/suggestions.component';
import Activities from 'components/activities/activities.component';
import Activity from 'components/activity/activity.component';
import Backups from 'components/backups/backups.component';

const useStyles = makeStyles(() => ({
  item: {
    position: 'relative',
  },
}));

function AdminPanel() {
  const classes = useStyles({});

  return (
    <>
      <Titlebar />
      <Grid container>
        <Grid item xs={2}>
          <SidePanel />
        </Grid>
        <Grid item xs={10} className={classes.item}>
          <LoadingOverlay />
          <Box p={4}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/clubs" />} />
              <RouteAuth exact path="/clubs" component={Clubs} credential="getClub" />
              <RouteAuth exact path="/clubs/page/:page" component={Clubs} credential="getClub" />
              <RouteAuth exact path="/clubs/new" component={(props) => <Club {...props} editType="new" />} credential="updateClub" />
              <RouteAuth path="/clubs/:id" component={(props) => <Club {...props} editType="update" />} credential="updateClub" />

              <RouteAuth exact path="/users" component={Users} credential="getUser" />
              <RouteAuth exact path="/users/page/:page" component={Users} credential="getUser" />
              <RouteAuth exact path="/users/new" component={(props) => <User {...props} editType="new" />} credential="updateUser" />
              <RouteAuth path="/users/:id" component={(props) => <User {...props} editType="update" />} credential="updateUser" />

              <RouteAuth exact path="/suggestions" component={Suggestions} credential="getSuggestion" />
              <RouteAuth exact path="/suggestions/page/:page" component={Suggestions} credential="getSuggestion" />

              <RouteAuth exact path="/activities" component={Activities} credential="getActivity" />
              <RouteAuth exact path="/activities/page/:page" component={Activities} credential="getActivity" />
              <RouteAuth exact path="/activities/:id" component={Activity} credential="getActivity" />

              <RouteAuth exact path="/backups" component={Backups} credential="getBackup" />
            </Switch>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default AdminPanel;
