import { CSSProperties } from 'react';

export interface iButton {
  onHandleClick?: () => void;
  text?: string;
  styles?: CSSProperties;
  filled?: boolean;
  primary?: boolean;
  secondary?: boolean;
}
