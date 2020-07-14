import React from 'react';
import styles from './Lobby.module.scss';
import BG from './assets/background.jpg';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import usePagination from '../components/pagination';
import Room from './Room';

export default function Lobby() {
  const room = useSelector((state: AppState) => state.room);
  const { data } = usePagination(room, 4);

  return (
    <div className={styles.lobby}>
      <div>
        <img className={styles.background} src={BG} alt={BG} />
        <Room style={{ left: `${30}%`, top: `${35}%` }} data={data[0]} />
        <Room style={{ left: `${70}%`, top: `${35}%` }} data={data[1]} />
        <Room style={{ left: `${30}%`, top: `${75}%` }} data={data[2]} />
        <Room style={{ left: `${70}%`, top: `${75}%` }} data={data[3]} />
      </div>
    </div>
  );
}
