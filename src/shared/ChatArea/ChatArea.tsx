import React from 'react';
import { iChatArea } from '../interfaces/interfaces';
import Message from './Message';
import styles from './styles/ChatArea.module.scss';

const ChatArea: React.FC<iChatArea> = ({ messages }) => {
  return (
    <div className={styles.ChatArea}>
      <div className={styles.message}>
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            sender={message.sender}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatArea;
