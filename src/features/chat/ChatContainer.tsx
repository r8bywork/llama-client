import SendIcon from '../../images/Send.svg?react';
import Button from '../../shared/Button/Button';
import Input from '../../shared/Input/Input';
import React from 'react';
const ChatContainer: React.FC = () => {
  const onBtnClick = () => {
    console.log('test');
  };
  return (
    <div>
      <Input />
      <Button
        text={'New Chat'}
        // filled
        secondary
        Icon={SendIcon}
        onHandleClick={onBtnClick}
      />
    </div>
  );
};
export default ChatContainer;
