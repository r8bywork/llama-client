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
  id: string;
  sender: string;
  text: string;
  date: Date;
}

export interface iSideBar {
  isOpen: boolean;
}
