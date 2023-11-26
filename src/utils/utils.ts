import { MessageType } from '../shared/interfaces/interfaces';

export const concatenateResponses = (data: string): string => {
  try {
    const responses = data
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((jsonString) => JSON.parse(jsonString.trim()));
    const concatenatedText = responses.map((item) => item.response).join('');
    console.log(concatenatedText);
    return concatenatedText;
  } catch (error) {
    console.error('Error parsing responses:', error);
    return '';
  }
};

export function updateMessagesWithAiResponse(
  prevMessages: MessageType[],
  parsedLines: { response: string }[],
  lastAiMessage: number,
): MessageType[] {
  const lastParsedLine: { response: string } = parsedLines[parsedLines.length - 1];
  const updatedMessages = [...prevMessages];
  updatedMessages[lastAiMessage] = {
    ...updatedMessages[lastAiMessage],
    sender: 'ai',
    text: `${updatedMessages[lastAiMessage]?.text || ''}${lastParsedLine.response}`,
    date: new Date(),
  };

  return updatedMessages;
}
