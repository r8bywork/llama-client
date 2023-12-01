import { useEffect, useState } from 'react';
import SendIcon from '../../assets/Send.svg?react';
import Button from '../../shared/Button/Button';
import ChatArea from '../../shared/ChatArea/ChatArea';
import Input from '../../shared/Input/Input';
import styles from './ChatContainer.module.scss';
import axios from 'axios';
import { MessageType } from '../../shared/interfaces/interfaces';
import { concatenateResponses, updateMessagesWithAiResponse } from '../../utils/utils';
import { v4 } from 'uuid';

const ChatContainer = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [models, setModels] = useState<string[]>([]);

  const getModels = async () => {
    await axios
      .get('http://localhost:11434/api/tags')
      .then((res) => {
        const modelsArray = res.data.models.map((elem: { name: string }) => elem.name);
        setModels(modelsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getModels();
  }, []);

  const handleSendMessage = async () => {
    const lastAiMessage = messages.length + 1;
    setLoading(true);
    setPrompt('');

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: v4(),
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
            const parsedLines: { response: string }[] = concatenateResponses(
              data.event.currentTarget.response,
            );
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

  const handleChangeInput = (prompt: string) => {
    setPrompt(prompt);
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
            prompt={prompt}
            onHandleChange={handleChangeInput}
            style={{ margin: '15px' }}
          />
          <Button
            onHandleClick={handleSendMessage}
            styles={{ padding: '16px' }}
            secondary
            Icon={SendIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
