import classNames from 'classnames';
import { iButton } from '../interfaces/interfaces';
import style from './Button.module.scss';

const Button = ({ text, styles, onHandleClick, filled, primary, secondary, Icon }: iButton) => {
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
      // tabIndex={-1}
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
