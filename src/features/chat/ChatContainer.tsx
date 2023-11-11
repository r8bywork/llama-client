// import { ReactComponent as SendIcon } from '../../assets/send.svg';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
const ChatContainer: React.FC = () => {
  const onBtnClick = () => {
    console.log('test');
  };
  return (
    <div>
      <Input />
      <Button
        text={'New Chat'}
        filled
        // secondary
        // Icon={SendIcon}
        onHandleClick={onBtnClick}
      />
    </div>
  );
};
export default ChatContainer;
