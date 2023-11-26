import { CSSProperties } from 'react';

export interface iButton {
  onHandleClick?: () => void;
  text?: string;
  styles?: CSSProperties;
  filled?: boolean;
  primary?: boolean;
  secondary?: boolean;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface MessageType {
  id: number;
  sender: string;
  text: string;
  date: Date;
}

export interface iInput {
  onHandleChange: (input: string) => void;
  prompt?: string;
  placeholder?: string;
  loading?: boolean;
  style?: CSSProperties;
}

export interface iSideBar {
  isOpen: boolean;
}
