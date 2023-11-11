import classNames from 'classnames';
import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './Input.module.scss';
import SendIcon from '../../assets/Send.svg?react';
const Input: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div
      className={classNames(styles.inputContainer, {
        [styles.focused]: isInputFocused,
      })}
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => setIsInputFocused(false)}
    >
      <input
        className={styles.messageContainer}
        type='text'
        value={inputValue}
        placeholder='Send a message'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
      />
      <Button
        styles={{ margin: '12px 16px' }}
        // secondary
        Icon={SendIcon}
      />
    </div>
  );
};

export default Input;
