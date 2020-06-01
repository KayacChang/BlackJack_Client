import React, { ReactNode, PropsWithChildren, HTMLAttributes } from 'react';
import styles from './Control.module.scss';
import { Button } from '../../../components/button/Button';

type Div<T> = PropsWithChildren<T & HTMLAttributes<HTMLDivElement>>;

type Props = Div<{
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
