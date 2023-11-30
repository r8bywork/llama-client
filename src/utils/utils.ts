import { v4 } from 'uuid';
import { MessageType } from '../shared/interfaces/interfaces';

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
  const newString = parsedLines.map((elem) => elem.response).join('');
  const updatedMessages = [...prevMessages];
  updatedMessages[lastAiMessage] = {
    ...updatedMessages[lastAiMessage],
    id: v4(),
    sender: 'ai',
    text: `${newString}`,
    date: new Date(),
  };

  return updatedMessages;
};
