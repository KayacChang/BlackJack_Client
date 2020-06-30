import React, { useState, useEffect } from 'react';
import Timer from '../components/timer';
import styles from './Bet.module.scss';
import { GAME_STATE } from '../../models';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import Controls from './Controls';
import Chips from './Chips';
import { useOpacity } from '../hooks';

export default function Bet() {
  const user = useSelector((state: AppState) => state.user);
  const seats = useSelector((state: AppState) => state.seat);
  const { state, countdown } = useSelector((state: AppState) => state.game);

  const isBetting = state === GAME_STATE.BETTING && countdown > 1;
  const isUserJoin = Object.values(seats).some(({ player }) => user.name === player);

  const [hasCommited, setCommited] = useState(false);
  const [opacity, display, onTransitionEnd, setOpacity] = useOpacity(0);

  useEffect(() => {
    const isCommited = Object.values(seats)
      .filter(({ player }) => player === user.name)
      .every(({ commited }) => commited);

    setCommited(isBetting && isCommited);
  }, [isBetting, seats, user]);

  useEffect(() => {
    if (isBetting && hasCommited) {
      setOpacity(0.3);
      return;
    }

    if (isBetting && isUserJoin) {
      setOpacity(1);
      return;
    }

    setOpacity(0);
  }, [setOpacity, isBetting, isUserJoin, hasCommited]);

  const enable = isBetting && isUserJoin && !hasCommited;

  return (
    <div className={styles.bet} onTransitionEnd={onTransitionEnd} style={{ opacity, display }}>
      <div>
        <h3>place your bets</h3>

        <Chips enable={enable} />

        <Timer total={20} countdown={countdown} />

        <Controls enable={enable} />
      </div>
    </div>
  );
}
