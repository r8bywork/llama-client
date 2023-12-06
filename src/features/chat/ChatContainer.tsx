import axios from 'axios';
import { useEffect, useState } from 'react';
import SendIcon from '../../assets/Send.svg?react';
import Button from '../../shared/Button/Button';
import ChatArea from '../../shared/ChatArea/ChatArea';
import Input from '../../shared/Input/Input';
import Switcher from '../../shared/Switcher/Switcher';
import { MessageType } from '../../shared/interfaces/interfaces';
import {
  addMessageFromUser,
  concatenateResponses,
  getModels,
  updateMessagesWithAiResponse,
} from '../../utils/utils';
import styles from './ChatContainer.module.scss';

const ChatContainer = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [models, setModels] = useState<string[]>([]);
  const [currentModel, setCurrentModel] = useState<string>();

  const generateAiResponse = async () => {
    const lastAiMessage = messages.length + 1;
    await axios
      .post(
        'http://localhost:11434/api/generate',
        {
          model: currentModel,
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

  const handleChangeModel = () => {
    setCurrentModel(
      models[(models.findIndex((model) => model === currentModel) + 1) % models.length],
    );
  };

  useEffect(() => {
    const ModelResponse = async () => {
      const res = await getModels();
      setModels(res);
      setCurrentModel(res[0]);
    };
    ModelResponse();
  }, []);

  useEffect(() => {
    console.log(models);
    console.log(currentModel);
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
        <Switcher
          handleChangeModel={handleChangeModel}
          model={currentModel || 'Download model'}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
