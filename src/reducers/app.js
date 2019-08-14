import update from 'immutability-helper';

import {
  SET_MESSAGE,
  SET_IS_AUTHENTICATED,
} from 'components/app/app.actions';

const initialState = {
  isAuthenticated: false,
  messageType: '', // error, success
  messageCode: '',
};

const app = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MESSAGE: {
      const { messageCode, messageType } = payload;

      return update(state, {
        messageCode: { $set: messageCode },
        messageType: { $set: messageType },
      });
    }

    case SET_IS_AUTHENTICATED: {
      return update(state, {
        isAuthenticated: { $set: payload },
      });
    }

    default: {
      return state;
    }
  }
}

export default app;
