import React, { PropsWithChildren, HTMLAttributes } from 'react';
import styles from './Lobby.module.scss';
import Table from './assets/table.png';
import Detail from './assets/detail.png';
import RoomNum from './assets/room_number.png';
import History from './assets/history.png';

function Room({ style }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={styles.room} style={style}>
      <img className={styles.table} src={Table} alt={Table} />
      <img className={styles.detailImg} src={Detail} alt={Detail} />
      <img className={styles.numberImg} src={RoomNum} alt={RoomNum} />
      <img className={styles.history} src={History} alt={History} style={{ left: `${50}%`, top: `${22}%` }} />
      <img className={styles.history} src={History} alt={History} style={{ left: `${50}%`, top: `${40}%` }} />

      <h3 className={styles.number}>02</h3>

      <div className={styles.detail}>
        <div>
          <h5>MAX</h5>
          <span>10000</span>
        </div>
        <div>
          <h5>MIN</h5>
          <span>10</span>
        </div>
        <div>
          <h5>PEOPLE</h5>
          <span>10</span>
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default function Lobby() {
  return (
    <div className={styles.lobby}>
      <div>
        <Room style={{ left: `${30}%`, top: `${35}%` }} />
        <Room style={{ left: `${70}%`, top: `${35}%` }} />
        <Room style={{ left: `${30}%`, top: `${75}%` }} />
        <Room style={{ left: `${70}%`, top: `${75}%` }} />
      </div>
    </div>
  );
}
