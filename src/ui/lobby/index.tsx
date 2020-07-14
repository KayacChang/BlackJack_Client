import React, { PropsWithChildren, HTMLAttributes } from 'react';
import styles from './Lobby.module.scss';
import BG from './assets/background.jpg';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import usePagination from '../components/pagination';
import Room from './Room';
import ARROW from './assets/arrow.png';
import clsx from 'clsx';

type ArrowProps = {
  reverse?: boolean;
} & PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

function Arrow({ style, reverse = false, onClick }: ArrowProps) {
  return (
    <div className={styles.control} style={style} onClick={onClick}>
      <img className={clsx(reverse && styles.reverse)} src={ARROW} alt={ARROW} />
    </div>
  );
}

type Props = {
  page: number;
  range: { max: number; min: number };
  next: () => void;
  prev: () => void;
};

function Control({ page, range, next, prev }: Props) {
  return (
    <div>
      {page > range.min && <Arrow style={{ left: `${7}%`, top: `${50}%` }} onClick={prev} />}

      {page < range.max && <Arrow reverse={true} style={{ left: `${93}%`, top: `${50}%` }} onClick={next} />}
    </div>
  );
}

export default function Lobby() {
  const room = useSelector((state: AppState) => state.room);
  const { data, page, range, next, prev } = usePagination(room, 4);

  return (
    <div className={styles.lobby}>
      <div>
        <img className={styles.background} src={BG} alt={BG} />
        <Room style={{ left: `${30}%`, top: `${35}%` }} data={data[0]} />
        <Room style={{ left: `${70}%`, top: `${35}%` }} data={data[1]} />
        <Room style={{ left: `${30}%`, top: `${75}%` }} data={data[2]} />
        <Room style={{ left: `${70}%`, top: `${75}%` }} data={data[3]} />

        <Control page={page} range={range} next={next} prev={prev} />
      </div>
    </div>
  );
}
