const namespace = 'APP';

export const SET_MESSAGE = `${namespace}_SET_MESSAGE`;

export const setMessage = (messageType, messageCode) => (dispatch) => {

  // const message = retrieveMessageFromCode(messageCode); // TODO: Translate

  dispatch({
    type: SET_MESSAGE,
    payload: {
      messageCode,
      messageType,
    }
  });
};
