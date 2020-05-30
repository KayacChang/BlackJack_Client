import React, { ReactNode } from 'react';
import styles from './Control.module.scss';
import { Button } from '../../../components/button/Button';

type Props = DivProps<{
  title: string;
  icon: ReactNode;
}>;

export default function Control({ title, icon, style }: Props) {
  return (
    <div className={styles.control}>
      <Button style={style}>{icon}</Button>
      <h5>{title}</h5>
    </div>
  );
}
