import axios from 'axios';
import React, { useState } from 'react';
import SendIcon from '../../assets/Send.svg?react';
import Button from '../../shared/Button/Button';
import ChatArea from '../../shared/ChatArea/ChatArea';
import Input from '../../shared/Input/Input';
import { concatenateResponses } from '../../utils/utils';
import styles from './ChatContainer.module.scss';
const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; sender: string; text: string }[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    setLoading(true);
    setPrompt('');
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, sender: 'user', text: prompt },
    ]);
    const res = await axios.post('http://localhost:11434/api/generate', {
      model: 'mistral',
      prompt: prompt,
    });
    const fullResponse = concatenateResponses(res.data);
    setLoading(false);

    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, sender: 'ai', text: fullResponse },
    ]);
  };

  const onHandleChange = (input: string) => {
    setPrompt(input);
  };

  return (
    <div className={styles.ChatContainer}>
      <div className={styles.ChatAreaContainer}>
        <ChatArea messages={messages} />
      </div>
      <div className={styles.inputContainer}>
        <Input
          loading={loading}
          onHandleChange={onHandleChange}
          prompt={prompt}
        />
        <Button
          // text={'asd'}
          onHandleClick={handleSendMessage}
          styles={{ marginLeft: '12px', padding: '16px' }}
          secondary
          // filled
          Icon={SendIcon}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
