import classNames from 'classnames';
import React from 'react';
import { v4 } from 'uuid';
import ChatIcon from '../../assets/Chat.svg?react';
import { items } from '../../settings/SideBar';
import Button from '../Button/Button';
import { iSideBar } from '../interfaces/interfaces';
import styles from './SideBar.module.scss';

const SideBar: React.FC<iSideBar> = ({ isOpen }) => {
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
