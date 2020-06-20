import React, { PropsWithChildren, HTMLAttributes } from 'react';
import styles from './Chip.module.scss';

type Props = {
  src: string;
  bet: number;
} & PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

function format(bet: number) {
  if (bet / 1000 >= 1) {
    return String(Math.floor(bet / 1000)) + 'K';
  }

  return String(bet);
}

export default function Chip({ src, bet, onClick }: Props) {
  return (
    <button className={styles.chip} onClick={onClick}>
      <h5>{format(bet)}</h5>
      <img src={src} alt={format(bet)} />
    </button>
  );
}
