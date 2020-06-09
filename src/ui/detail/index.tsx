import React, { useState } from 'react';
import { Home } from 'react-feather';
import { Button } from '../components/button/Button';
import styles from './Detail.module.scss';

function Back() {
  return (
    <Button className={styles.back}>
      <Home />
    </Button>
  );
}

type Props = {
  title: string;
  value: string;
};

function Field({ title, value }: Props) {
  return (
    <div className={styles.field}>
      <h5>{title}</h5>
      <span>{value}</span>
    </div>
  );
}

export default function RoomDetail() {
  const [roomID] = useState('20');
  const [roundID] = useState('12');
  const [range] = useState('50 - 1,000');

  return (
    <div className={styles.detail}>
      <Back />
      <Field title={'blackjack'} value={roomID} />
      <Field title={'round'} value={roundID} />
      <Field title={'bet'} value={range} />
    </div>
  );
}
