import { useRef, useState } from 'react';
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
  const prompt = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    const lastAiMessage = messages.length + 1;
    setLoading(true);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        sender: 'user',
        text: prompt.current!.value,
        date: new Date(),
      },
    ]);

    await axios
      .post(
        'http://localhost:11434/api/generate',
        {
          model: 'orca-mini',
          prompt: prompt.current?.value,
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
    prompt.current!.value = '';
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
