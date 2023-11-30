import { CSSProperties, ChangeEvent } from 'react';
import styles from './Input.module.scss';

export interface iInput {
  onHandleChange: (prompt: string) => void;
  placeholder?: string;
  prompt?: string;
  loading?: boolean;
  style?: CSSProperties;
}

const Input = ({ prompt, onHandleChange, placeholder, loading, style }: iInput) => {
  return (
    <input
      className={styles.messageContainer}
      value={loading ? 'Generating response...' : prompt}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onHandleChange(e.target.value);
      }}
      style={style}
      type='text'
      placeholder={placeholder ?? 'Send a message'}
      disabled={loading}
    />
  );
};

export default Input;
