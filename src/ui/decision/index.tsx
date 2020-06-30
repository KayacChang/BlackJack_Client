import React, { useState, useLayoutEffect, useEffect } from 'react';
import styles from './Decision.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { GAME_STATE } from '../../models';
import Timer from '../components/timer';
import { useOpacity } from '../hooks';
import Controls from './Controls';

export default function Decision() {
  const user = useSelector((state: AppState) => state.user);
  const { state, countdown, turn } = useSelector((state: AppState) => state.game);
  const seat = useSelector((state: AppState) => state.seat);

  const isDealing = state === GAME_STATE.DEALING && countdown > 1;
  const isUserTurn = turn ? seat[turn.seat].player === user.name : false;

  const [hasCommited, setCommited] = useState(false);
  const [opacity, display, onTransitionEnd, setOpacity] = useOpacity(0);

  useEffect(() => {
    const flag = user.decisions.length > 0;

    setCommited(!flag);
  }, [setCommited, user]);

  useLayoutEffect(() => {
    if (isDealing && isUserTurn && hasCommited) {
      setOpacity(0.3);
      return;
    }

    if (isDealing && isUserTurn) {
      setCommited(false);
      setOpacity(1);
      return;
    }

    setOpacity(0);
  }, [setOpacity, isDealing, isUserTurn, hasCommited]);

  return (
    <div className={styles.decision} onTransitionEnd={onTransitionEnd} style={{ opacity, display }}>
      <div>
        <h3>make your decision</h3>

        <Controls enable={isUserTurn && isDealing} setCommited={setCommited} />

        <Timer total={10} countdown={countdown} />
      </div>
    </div>
  );
}
