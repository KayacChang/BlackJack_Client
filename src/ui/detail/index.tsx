import React from 'react';
import { Home } from 'react-feather';
import { Button } from '../components/button/Button';
import styles from './Detail.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

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
  const roomID = useSelector((state: AppState) => state.game.room);
  const roundID = useSelector((state: AppState) => state.game.round);
  const { max, min } = useSelector((state: AppState) => state.game.bet);

  return (
    <div className={styles.detail}>
      <Back />
      <Field title={'room'} value={String(roomID)} />
      <Field title={'round'} value={roundID} />
      <Field title={'bet'} value={`${min} - ${max}`} />
    </div>
  );
}
