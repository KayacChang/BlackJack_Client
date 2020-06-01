import React, { ReactNode, PropsWithChildren, HTMLAttributes } from 'react';
import { Plus, Minus, Code } from 'react-feather';
import styles from './Decision.module.scss';
import { Button } from '../../components/button/Button';
import Timer from '../../components/timer';

type ButtonProps<T> = PropsWithChildren<T & HTMLAttributes<HTMLButtonElement>>;

type Props = ButtonProps<{
  title: string;
  icon: ReactNode;
}>;

function Control({ className, title, icon }: Props) {
  //
  return (
    <div className={className}>
      <Button>{icon}</Button>
      <h5>{title}</h5>
    </div>
  );
}

export default function Decision() {
  return (
    <div className={styles.decision}>
      <div>
        <h3>make your decision</h3>

        <div className={styles.section}>
          <Control className={styles.double} icon={<h3>2x</h3>} title={'double down'} />
          <Control className={styles.hit} icon={<Plus />} title={'hit'} />
          <Control className={styles.stand} icon={<Minus />} title={'stand'} />
          <Control className={styles.split} icon={<Code />} title={'split'} />
        </div>

        <Timer />
      </div>
    </div>
  );
}
