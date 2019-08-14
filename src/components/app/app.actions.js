import Api from 'services/api';
import history from 'config/history';

const namespace = 'APP';

export const SET_MESSAGE = `${namespace}_SET_MESSAGE`;
export const SET_IS_AUTHENTICATED = `${namespace}_SET_IS_AUTHENTICATED`;

export const setMessage = (messageType, messageCode) => (dispatch) => {

  // const message = retrieveMessageFromCode(messageCode); // TODO: Translate

  dispatch({
    type: SET_MESSAGE,
    payload: {
      messageCode,
      messageType,
    },
  });
};

export const setIsAuthenticated = (isAuthenticated) => (dispatch) => {
  dispatch({
    type: SET_IS_AUTHENTICATED,
    payload: isAuthenticated,
  });
};

export const login = (email, password) => async (dispatch) => {
  try {
    const { data: jwtToken } = await Api.post('/users/login', {
      email,
      password,
    });

    localStorage.setItem('jwtToken', jwtToken);

    dispatch(setMessage('success', 'LOGIN_SUCCESS'));
    dispatch(setIsAuthenticated(true));
  } catch (error) {
    const {
      response: {
        data: {
          type,
        },
      },
    } = error;
    
    dispatch(setMessage('error', type));
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');

  history.push('/login');

  dispatch(setMessage('success', 'LOGOUT_SUCCESS'));
  dispatch(setIsAuthenticated(false));
}
