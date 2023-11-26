import { useState } from 'react';
import SendIcon from '../../assets/Send.svg?react';
import Button from '../../shared/Button/Button';
import ChatArea from '../../shared/ChatArea/ChatArea';
import Input from '../../shared/Input/Input';
import styles from './ChatContainer.module.scss';
import axios from 'axios';
import { MessageType } from '../../shared/interfaces/interfaces';
import { updateMessagesWithAiResponse } from '../../utils/utils';

const ChatContainer = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    const lastAiMessage = messages.length + 1;
    setPrompt('');
    setLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        sender: 'user',
        text: prompt,
        date: new Date(),
      },
    ]);

    await axios
      .post(
        'http://localhost:11434/api/generate',
        {
          model: 'orca-mini',
          prompt: prompt,
          stream: true,
        },
        {
          onDownloadProgress(data) {
            const parsedLines: [] = data.event.currentTarget.response
              .split('\n')
              .filter(Boolean)
              .map((line: string) => JSON.parse(line));
            // console.log(parsedLines);
            setMessages((prevMessages) => {
              const updatedMessages = updateMessagesWithAiResponse(
                prevMessages,
                parsedLines,
                lastAiMessage,
              );
              return updatedMessages;
            });
          },
        },
      )
      .catch((err) => {
        console.error(err);
      });
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
