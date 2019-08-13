import React from 'react';
import {
  Router,
  Route,
} from 'react-router';
import { useSelector } from 'react-redux';

import history from 'config/history';
import Titlebar from 'components/titlebar/titlebar.component';
import Message from 'components/message/message.component';

import SidePanel from 'components/sidePanel/sidePanel.component';
import Login from 'components/login/login.component';

import Clubs from 'components/clubs/clubs.component';
import Users from 'components/users/users.component';

function App() {
  const jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) history.push('/login');

  const app = useSelector(state => state.app);
  const { messageCode, messageType } = app;

  return (
    <div id="admin">
      <Titlebar />

      <Router history={history}>
        {jwtToken
          ? (
            <>
              <SidePanel />
              <Route path="/clubs" component={Clubs} />
              <Route path="/users" component={Users} />
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
