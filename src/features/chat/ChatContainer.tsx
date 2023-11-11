import axios from 'axios';
import React, { useState } from 'react';
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
      <ChatArea messages={messages} />
      <Input
        loading={loading}
        onHandleClick={handleSendMessage}
        onHandleChange={onHandleChange}
        prompt={prompt}
      />
    </div>
  );
};

export default ChatContainer;
