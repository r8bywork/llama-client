import classNames from 'classnames';
import React from 'react';
import { iMessage } from '../interfaces/interfaces';
import styles from './styles/Message.module.scss';

const Message: React.FC<iMessage> = ({ text, sender }) => {
  const messageClass = classNames(styles.Message, {
    [styles.UserMessage]: sender === 'user',
    [styles.AiMessage]: sender === 'ai',
  });

  return <div className={messageClass}>{text}</div>;
};

export default Message;
