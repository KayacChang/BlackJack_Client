import React from 'react';
import styles from './Chip.module.scss';

type Props = {
  src: string;
};

export default function Chip({ src }: Props) {
  return <img className={styles.chip} src={src} alt={src} />;
}
