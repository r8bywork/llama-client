import classNames from 'classnames';
import React from 'react';
import { iButton } from '../interfaces/interfaces';
import style from './Button.module.scss';

const Button: React.FC<iButton> = ({
  text,
  styles,
  onHandleClick,
  filled,
  primary,
  secondary,
  Icon,
}) => {
  const classNamesButton = classNames(style.button, {
    [style.filled]: filled,
    [style.primary]: primary,
    [style.secondary]: secondary,
  });

  return (
    <div
      style={styles}
      onClick={onHandleClick}
      onKeyDown={onHandleClick}
      className={classNamesButton}
      tabIndex={0}
    >
      {Icon && <Icon />}
      {text}
    </div>
  );
};

export default Button;
