import React, { useEffect, useState } from 'react';
import { Plus, Minus, Code, Flag } from 'react-feather';
import { RiSafeLine, RiHandCoinLine } from 'react-icons/ri';
import styles from './Decision.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { GAME_STATE } from '../../models';
import Timer from '../components/timer';
import Control from '../components/button/Control';

export default function Decision() {
  const user = useSelector((state: AppState) => state.user);
  const { state, countdown, turn } = useSelector((state: AppState) => state.game);

  const seat = useSelector((state: AppState) => state.seat);

  const isDealing = state === GAME_STATE.DEALING && countdown > 1;
  const isUserTurn = turn && seat[turn.seat].player === user.name;

  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setOpacity(0);

    if (!isDealing) {
      setOpacity(0);
      return;
    }

    if (isUserTurn && isDealing) {
      setOpacity(1);
      return;
    }
  }, [isDealing, isUserTurn]);

  return (
    <div className={styles.decision} style={{ opacity }}>
      <div>
        <h3>make your decision</h3>

        <div className={styles.section}>
          <Control className={styles.indigo} icon={<RiSafeLine />} title={'insurance'} />
          <Control className={styles.orange} icon={<RiHandCoinLine />} title={'pay'} />
          <Control className={styles.red} icon={<Minus />} title={'stand'} />
          <Control className={styles.green} icon={<Plus />} title={'hit'} />
          <Control className={styles.yellow} icon={<h3>2x</h3>} title={'double'} />
          <Control className={styles.teal} icon={<Code />} title={'split'} />
          <Control className={styles.gray} icon={<Flag />} title={'surrender'} />
        </div>

        <Timer total={10} countdown={countdown} />
      </div>
    </div>
  );
}
