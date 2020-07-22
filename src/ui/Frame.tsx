import React, { ReactNode } from 'react';
import styles from './Frame.module.scss';
import { IconContext } from 'react-icons';
import { MdScreenRotation } from 'react-icons/md';
import UI from './UI';

type Props = {
  children: ReactNode;
};

function Rotation() {
  return (
    <IconContext.Provider value={{ size: '50vw', className: styles.rotation }}>
      <MdScreenRotation />
    </IconContext.Provider>
  );
}

export default function Frame({ children }: Props) {
  return (
    <div className={styles.frame}>
      <Rotation />
      <div className={styles.main}>
        {children}
        <UI />
      </div>
    </div>
  );
}
