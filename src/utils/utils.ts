import { v4 } from 'uuid';
import { MessageType } from '../shared/interfaces/interfaces';
import axios from 'axios';

export const concatenateResponses = (data: string): { response: string }[] => {
  const responses = data
    .split('\n')
    .filter(Boolean)
    .map((line: string) => JSON.parse(line));
  return responses;
};

export const updateMessagesWithAiResponse = (
  prevMessages: MessageType[],
  parsedLines: { response: string }[],
  lastAiMessage: number,
): MessageType[] => {
  const newChunk = parsedLines.map((elem) => elem.response).join('');
  const updatedMessages = [...prevMessages];
  updatedMessages[lastAiMessage] = {
    ...updatedMessages[lastAiMessage],
    id: v4(),
    sender: 'ai',
    text: `${newChunk}`,
    date: new Date(),
  };

  return updatedMessages;
};

export const addMessageFromUser = (prompt: string, prevMessages: MessageType[]): MessageType[] => {
  return [
    ...prevMessages,
    {
      id: v4(),
      sender: 'user',
      text: prompt,
      date: new Date(),
    },
  ];
};

export const getModels = async () =>
  await axios
    .get('http://localhost:11434/api/tags')
    .then((res) => {
      return res.data.models.map((elem: { name: string }) => elem.name);
    })
    .catch((err) => {
      console.log(err);
    });
