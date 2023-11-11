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

export interface iChatArea {
  messages: { id: number; sender: string; text: string }[];
}

export interface iInput {
  onHandleChange: (input: string) => void;
  onHandleClick: () => void;
  prompt: string;
  placeholder?: string;
  loading?: boolean;
}

export interface iMessage {
  text: string;
  sender: string;
}
