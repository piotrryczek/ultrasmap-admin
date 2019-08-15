import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useDebouncedCallback } from 'use-debounce';

import { MESSAGE_HIDE_DELAY } from 'config/config';
import { clearMessage } from 'components/app/app.actions';

function Message() {

  const dispatch = useDispatch();

  const {
    messageCode,
    messageType,
  } = useSelector(state => ({
    messageCode: state.app.messageCode,
    messageType: state.app.messageType,
  }));

  const [clearMessageDebounced] = useDebouncedCallback(() => {
    dispatch(clearMessage());
  }, MESSAGE_HIDE_DELAY);

  if (messageCode) clearMessageDebounced();

  const { t } = useTranslation();

  return messageCode && messageType && (
    <p>
      {messageType === 'success' ? 'Success: ' : 'Error: '}
      {t(messageCode)}
    </p>
  );
}

export default Message;
