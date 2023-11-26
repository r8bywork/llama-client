import { useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import Message from './Message';
import styles from './styles/ChatArea.module.scss';

export interface ChatAreaProps {
  messages: { id: number; sender: string; text: string; date: Date }[];
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
            key={v4()}
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
