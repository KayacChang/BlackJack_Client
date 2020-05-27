import React from 'react';
import styles from './Timer.module.scss';
import { Triangle } from '../../../components/shape';

export default function Timer() {
  //
  return (
    <div className={styles.timer}>
      <Triangle direction={'left'} len={92} color={'rgba(48, 209, 88, 1)'} />
      <h4>11</h4>
      <Triangle direction={'right'} len={92} color={'rgba(48, 209, 88, 1)'} />
    </div>
  );
}
