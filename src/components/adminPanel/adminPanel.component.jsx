import React from 'react';

import { Switch, Redirect, Route } from 'react-router';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import RouteAuth from 'components/routeAuth/routeAuth.component';

import Titlebar from 'components/titlebar/titlebar.component';
import SidePanel from 'components/sidePanel/sidePanel.component';

import Clubs from 'components/clubs/clubs.component';
import Club from 'components/club/club.component';
import Users from 'components/users/users.component';
import User from 'components/user/user.component';
import Suggestions from 'components/suggestions/suggestions.component';
import Activities from 'components/activities/activities.component';
import Backups from 'components/backups/backups.component';

function AdminPanel() {
  return (
    <>
      <Titlebar />
      <Grid container>
        <Grid item xs={2}>
          <SidePanel />
        </Grid>
        <Grid item xs={10}>
          <Box p={4}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/clubs" />} />
              <RouteAuth exact path="/clubs" component={Clubs} credential="getClub" />
              <RouteAuth exact path="/clubs/new" component={(props) => <Club {...props} editType="new" />} credential="updateClub" />
              <RouteAuth path="/clubs/:id" component={(props) => <Club {...props} editType="update" />} credential="updateClub" />

              <RouteAuth exact path="/users" component={Users} credential="getUser" />
              <RouteAuth exact path="/users/new" component={(props) => <User {...props} editType="new" />} credential="updateUser" />
              <RouteAuth path="/users/:id" component={(props) => <User {...props} editType="update" />} credential="updateUser" />

              <RouteAuth path="/suggestions" component={Suggestions} credential="getSuggestion" />

              <RouteAuth exact path="/activities" component={Activities} credential="getActivity" />

              <RouteAuth exact path="/backups" component={Backups} credential="getBackup" />
            </Switch>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default AdminPanel;
