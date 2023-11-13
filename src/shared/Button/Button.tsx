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
    [style.hasText]: text,
    [style.hasSvg]: Icon,
  });

  return (
    <div
      style={styles}
      onClick={onHandleClick}
      onKeyDown={onHandleClick}
      className={classNamesButton}
      tabIndex={0}
    >
      {Icon && (
        <div className={style.svgContainer}>
          <Icon />
        </div>
      )}
      <div className={style.textContainer}>{text}</div>
    </div>
  );
};

export default Button;
