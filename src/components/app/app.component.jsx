/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Router,
  Route,
} from 'react-router';
import { useSelector, shallowEqual } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';

import theme from 'theme/muiTheme';
import history from 'config/history';

import AdminPanel from 'components/adminPanel/adminPanel.component';
import Message from 'components/message/message.component';

import Login from 'components/login/login.component';

function App() {
  const jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) history.push('/login');

  const isAuthenticated = useSelector(state => state.app.isAuthenticated, shallowEqual);

  return (
    <MuiThemeProvider theme={theme}>
      <div id="admin">
        <Router history={history}>
          {isAuthenticated
            ? <AdminPanel />
            : <Route path="/login" component={Login} />}
        </Router>

        <Message />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
