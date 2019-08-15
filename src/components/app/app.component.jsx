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
import { useSelector } from 'react-redux';

import history from 'config/history';
import Titlebar from 'components/titlebar/titlebar.component';
import Message from 'components/message/message.component';

import SidePanel from 'components/sidePanel/sidePanel.component';
import Login from 'components/login/login.component';

import Clubs from 'components/clubs/clubs.component';
import Club from 'components/club/club.component';

import Users from 'components/users/users.component';
import User from 'components/user/user.component';

import Suggestions from 'components/suggestions/suggestions.component';
import Suggestion from 'components/suggestion/suggestion.component';

import Activities from 'components/activities/activities.component';

function App() {
  const jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) history.push('/login');

  const {
    messageCode,
    messageType,
    isAuthenticated,
  } = useSelector(state => ({
    messageCode: state.app.messageCode,
    messageType: state.app.messageType,
    isAuthenticated: state.app.isAuthenticated,
  }));

  return (
    <div id="admin">
      <Titlebar />

      <Router history={history}>
        {isAuthenticated
          ? (
            <>
              <SidePanel />
              <Switch>
                <Route exact path="/clubs" component={Clubs} />
                <Route path="/clubs/:id" component={Club} />

                <Route exact path="/users" component={Users} />
                <Route path="/users/:id" component={User} />

                <Route exact path="/suggestions" component={Suggestions} />
                <Route path="/suggestions/:id" component={Suggestion} />

                <Route exact path="/activities" component={Activities} />
              </Switch>
            </>
          )
          : (
            <Route path="/login" component={Login} />
          )}
      </Router>

      {messageCode && (
        <Message
          messageCode={messageCode}
          messageType={messageType}
        />
      )}
    </div>
  );
}

export default App;
