import classNames from 'classnames';
import React, { useState } from 'react';
import SendIcon from '../../assets/Send.svg?react';
import Button from '../Button/Button';
import { iInput } from '../interfaces/interfaces';
import styles from './Input.module.scss';

const Input: React.FC<iInput> = ({
  onHandleChange,
  onHandleClick,
  prompt,
  placeholder,
  loading,
}) => {
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
        disabled={loading}
        value={loading ? 'Generate response...' : prompt}
        placeholder={placeholder ?? 'Send a message'}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onHandleChange(e.target.value);
        }}
      />
      <Button
        // text={'asd'}
        onHandleClick={onHandleClick}
        styles={{ margin: '12px 16px' }}
        secondary
        // filled
        Icon={SendIcon}
      />
    </div>
  );
};

export default Input;
