import React from 'react';
import { useTranslation } from 'react-i18next';

function Message(props) {
  const { messageCode, messageType } = props;

  const { t } = useTranslation();

  return (
    <p>{t(messageCode)}</p>
  )
}

export default Message;
