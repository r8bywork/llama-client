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
