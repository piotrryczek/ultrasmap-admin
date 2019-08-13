import {
  SET_MESSAGE,
} from 'components/app/app.actions';

const initialState = {
  messageType: '', // error, success
  messageCode: '',
};

const app = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_MESSAGE: {
      const { messageCode, messageType } = payload;
      return {
        messageCode,
        messageType
      };
    }

    default: {
      return state;
    }
  }
}

export default app;
