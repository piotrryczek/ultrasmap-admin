/* eslint-disable react/jsx-props-no-spreading */
/**
 * TODO:
 * - create authenticated route to check if user has credentials / rights to enter it
 */

import React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router';
import { useSelector, shallowEqual } from 'react-redux';

import history from 'config/history';
import Titlebar from 'components/titlebar/titlebar.component';
import Message from 'components/message/message.component';

import RouteAuth from 'components/routeAuth/routeAuth.component';

import SidePanel from 'components/sidePanel/sidePanel.component';
import Login from 'components/login/login.component';

import Clubs from 'components/clubs/clubs.component';
import Club from 'components/club/club.component';

import Users from 'components/users/users.component';
import User from 'components/user/user.component';

import Suggestions from 'components/suggestions/suggestions.component';
import Suggestion from 'components/suggestion/suggestion.component';

import Activities from 'components/activities/activities.component';

import Backups from 'components/backups/backups.component';

function App() {
  const jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) history.push('/login');

  const {
    isAuthenticated,
  } = useSelector(state => ({
    isAuthenticated: state.app.isAuthenticated,
  }), shallowEqual);

  return (
    <div id="admin">
      <Titlebar />

      <Router history={history}>
        {isAuthenticated
          ? (
            <>
              <SidePanel />
              <Switch>
                <RouteAuth exact path="/clubs" component={Clubs} credential="getClub" />
                <RouteAuth exact path="/clubs/new" component={(props) => <Club {...props} editType="new" />} credential="updateClub" />
                <RouteAuth path="/clubs/:id" component={(props) => <Club {...props} editType="update" />} credential="updateClub" />

                <RouteAuth exact path="/users" component={Users} credential="getUser" />
                <RouteAuth exact path="/users/new" component={(props) => <User {...props} editType="new" />} credential="updateUser" />
                <RouteAuth path="/users/:id" component={(props) => <User {...props} editType="update" />} credential="updateUser" />

                <RouteAuth exact path="/suggestions" component={Suggestions} credential="getSuggestion" />
                <RouteAuth path="/suggestions/:id" component={Suggestion} credential="updateSuggestion" />

                <RouteAuth exact path="/activities" component={Activities} credential="getActivity" />

                <RouteAuth exact path="/backups" component={Backups} credential="getBackup" />
              </Switch>
            </>
          )
          : (
            <Route path="/login" component={Login} />
          )}
      </Router>

      <Message />
    </div>
  );
}

export default App;
