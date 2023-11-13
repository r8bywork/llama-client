import { useState } from 'react';
import MenuIcon from '../assets/menu.svg?react';
import ChatContainer from '../features/chat/ChatContainer';
import Button from '../shared/Button/Button';
import SideBar from '../shared/SideBar/SideBar';
import './App.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='container'>
      <SideBar isOpen={isOpen} />
      <Button
        onHandleClick={toggleMenu}
        secondary
        Icon={MenuIcon}
      />
      <ChatContainer />
    </div>
  );
};

export default App;
