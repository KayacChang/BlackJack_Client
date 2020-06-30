import React, { useState, useEffect, useCallback } from 'react';
import Timer from '../components/timer';
import styles from './Bet.module.scss';
import { GAME_STATE } from '../../models';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import Controls from './Controls';
import Chips from './Chips';

export default function Bet() {
  const user = useSelector((state: AppState) => state.user);
  const seats = useSelector((state: AppState) => state.seat);
  const { state, countdown } = useSelector((state: AppState) => state.game);

  const isBetting = state === GAME_STATE.BETTING && countdown > 1;
  const isUserJoin = Object.values(seats).some(({ player }) => user.name === player);

  const [hasCommited, setCommited] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [display, setDisplay] = useState('none');

  const onTransitionEnd = useCallback(
    //
    () => setDisplay(opacity > 0 ? 'block' : 'none'),
    [opacity, setDisplay]
  );

  useEffect(() => {
    const isCommited = Object.values(seats)
      .filter(({ player }) => player === user.name)
      .every(({ commited }) => commited);

    setCommited(isBetting && isCommited);
  }, [isBetting, seats, user]);

  useEffect(() => {
    if (hasCommited) {
      setOpacity(0.3);
      onTransitionEnd();
      return;
    }

    if (isUserJoin && isBetting) {
      setOpacity(1);
      onTransitionEnd();
      return;
    }

    setOpacity(0);
  }, [onTransitionEnd, hasCommited, isBetting, isUserJoin]);

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
