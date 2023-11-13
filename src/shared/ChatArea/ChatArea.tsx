import React, { useEffect, useRef } from 'react';
import { iChatArea } from '../interfaces/interfaces';
import Message from './Message';
import styles from './styles/ChatArea.module.scss';

const ChatArea: React.FC<iChatArea> = ({ messages }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages.length]);

  return (
    <div className={styles.ChatArea}>
      <div
        className={styles.message}
        ref={ref}
      >
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
