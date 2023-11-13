import React from 'react';
import { iInput } from '../interfaces/interfaces';
import styles from './Input.module.scss';

const Input: React.FC<iInput> = ({ onHandleChange, prompt, placeholder, loading }) => {
  return (
    <input
      className={styles.messageContainer}
      type='text'
      value={loading ? 'Generate response...' : prompt}
      placeholder={placeholder ?? 'Send a message'}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onHandleChange(e.target.value);
      }}
      disabled={loading}
    />
  );
};

export default Input;
