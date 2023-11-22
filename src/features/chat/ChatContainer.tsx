// import axios from 'axios';
import React, { useState } from 'react';
import SendIcon from '../../assets/Send.svg?react';
import Button from '../../shared/Button/Button';
import ChatArea from '../../shared/ChatArea/ChatArea';
import Input from '../../shared/Input/Input';
import styles from './ChatContainer.module.scss';

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; sender: string; text: string }[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // const handleSendMessage = async () => {
  //   setLoading(true);
  //   setPrompt('');
  //   setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: prompt }]);
  //   const res = await axios.post('http://localhost:11434/api/generate', {
  //     model: 'orca-mini',
  //     prompt: prompt,
  //     stream: false,
  //   });
  //   setLoading(false);
  //   setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: res.data.response }]);
  // };

  const handleSendMessage = async () => {
    setPrompt('');
    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, sender: 'user', text: prompt },
    ]);

    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      body: JSON.stringify({
        model: 'orca-mini',
        prompt: prompt,
        stream: true,
      }),
    });
    const reader = res.body?.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const chunk = await reader?.read();
      const { done, value } = chunk;

      if (done) {
        break;
      }

      const lines = decoder.decode(value).split('\n');
      const parsedLines = lines.filter(Boolean).map((line) => JSON.parse(line));

      const lastAiMessage = messages.length + 1;

      for (const parsedLine of parsedLines) {
        const { response } = parsedLine;
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[lastAiMessage] = {
            ...updatedMessages[lastAiMessage],
            sender: 'ai',
            text: `${updatedMessages[lastAiMessage]?.text || ''} ${response}`,
          };
          return updatedMessages;
        });
      }
    }
    setLoading(false);
  };

  const onHandleChange = (input: string) => {
    setPrompt(input);
  };

  return (
    <div className={styles.background}>
      <div className={styles.ChatContainer}>
        <div className={styles.ChatAreaContainer}>
          <ChatArea messages={messages} />
        </div>
        <div className={styles.inputContainer}>
          <Input
            loading={loading}
            onHandleChange={onHandleChange}
            prompt={prompt}
            style={{ margin: '15px' }}
          />
          <Button
            // text={'asd'}
            onHandleClick={handleSendMessage}
            styles={{ padding: '16px' }}
            secondary
            // filled
            Icon={SendIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
