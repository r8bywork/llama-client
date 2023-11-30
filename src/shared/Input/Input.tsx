import { CSSProperties, RefObject } from 'react';
import styles from './Input.module.scss';

export interface iInput {
  onHandleChange?: (input: string) => void;
  prompt?: RefObject<HTMLInputElement>;
  placeholder?: string;
  loading?: boolean;
  style?: CSSProperties;
}

const Input = ({ prompt, placeholder, loading, style }: iInput) => {
  return (
    <input
      ref={prompt}
      className={styles.messageContainer}
      style={style}
      type='text'
      placeholder={placeholder ?? 'Send a message'}
      disabled={loading}
    />
  );
};

export default Input;
