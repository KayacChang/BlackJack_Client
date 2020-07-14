import React, { PropsWithChildren, HTMLAttributes } from 'react';
import styles from './Lobby.module.scss';
import Table from './assets/table.png';
import Detail from './assets/detail.png';
import RoomNum from './assets/room_number.png';
import { times, identity } from 'ramda';
import { Room as Model } from '../../models';

type Props = { data: Model } & PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function Room({ style, data }: Props) {
  const roomNum = String(data?.id || '').padStart(2, '0');
  const history = data?.history.slice(0, 20) || [];

  const max = data?.bet.max || '';
  const min = data?.bet.min || '';
  const people = data?.people || 0;

  return (
    <div className={styles.room} style={style}>
      <img className={styles.table} src={Table} alt={Table} />
      <img className={styles.detailImg} src={Detail} alt={Detail} />

      <div>
        <img className={styles.numberImg} src={RoomNum} alt={RoomNum} />
        <h3 className={styles.number}>{roomNum}</h3>
      </div>

      <div className={styles.detail}>
        <div>
          <h5>MAX</h5>
          <span>{max}</span>
        </div>
        <div>
          <h5>MIN</h5>
          <span>{min}</span>
        </div>
        <div>
          <h5>PEOPLE</h5>
          <span>{people}</span>
        </div>
      </div>

      <div className={styles.history}>
        {times(identity, 20).map((id) => (
          <div key={id}>
            <h5>{id + 1}</h5>
            <h4>{history[id] || ''}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
