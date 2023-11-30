import { useEffect, useRef } from 'react';
import Message from './Message';
import styles from './styles/ChatArea.module.scss';
import { MessageType } from '../interfaces/interfaces';

export interface ChatAreaProps {
  messages: MessageType[];
}
const ChatArea = ({ messages }: ChatAreaProps) => {
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
            date={message.date}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatArea;
