import classNames from 'classnames';
import { v4 } from 'uuid';
import ChatIcon from '../../assets/Chat.svg?react';
import { items } from '../../settings/SideBar';
import Button from '../Button/Button';
import styles from './SideBar.module.scss';

interface SideBarProps {
  isOpen: boolean;
}

const SideBar = ({ isOpen }: SideBarProps) => {
  const getSidebarClassNames = (isOpen: boolean) => {
    return classNames(styles.sidebar, {
      [styles.open]: isOpen,
    });
  };

  return (
    <div className={styles.container}>
      <div className={getSidebarClassNames(isOpen)}>
        <ul className={styles.menu}>
          {items.map((item) => (
            <li key={v4()}>
              <Button
                text={item.label}
                secondary
                Icon={ChatIcon}
                styles={{
                  color: 'white',
                  backgroundColor: '#211F26',
                  padding: '10px',
                  textAlign: 'left',
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
