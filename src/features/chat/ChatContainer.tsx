import Button from '../../shared/Button/Button';

const ChatContainer: React.FC = () => {
  const onBtnClick = () => {
    console.log('test');
  };
  return (
    <Button
      text={'New Chat'}
      filled
      // secondary
      onHandleClick={onBtnClick}
    />
  );
};
export default ChatContainer;
