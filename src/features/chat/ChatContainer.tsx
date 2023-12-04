import { useEffect, useState } from 'react';
import SendIcon from '../../assets/Send.svg?react';
import Button from '../../shared/Button/Button';
import ChatArea from '../../shared/ChatArea/ChatArea';
import Input from '../../shared/Input/Input';
import styles from './ChatContainer.module.scss';
import axios from 'axios';
import { MessageType } from '../../shared/interfaces/interfaces';
import {
  addMessageFromUser,
  concatenateResponses,
  getModels,
  updateMessagesWithAiResponse,
} from '../../utils/utils';

const ChatContainer = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [models, setModels] = useState<string[]>([]);

  const generateAiResponse = async () => {
    const lastAiMessage = messages.length + 1;
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
              return updateMessagesWithAiResponse(prevMessages, parsedLines, lastAiMessage);
            });
          },
        },
      )
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSendMessage = async () => {
    setLoading(true);
    setPrompt('');
    setMessages((prevMessages) => addMessageFromUser(prompt, prevMessages));
    await generateAiResponse();
    setLoading(false);
  };

  const handleChangeInput = (prompt: string) => {
    setPrompt(prompt);
  };

  useEffect(() => {
    const ModelResponse = async () => {
      setModels(await getModels());
    };
    ModelResponse();
  }, []);

  useEffect(() => {
    console.log(models);
  }, [models]);

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
