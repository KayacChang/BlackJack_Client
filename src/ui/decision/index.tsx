import React, { useEffect, useState } from 'react';
import { Plus, Minus, Code, Flag } from 'react-feather';
import { RiSafeLine, RiHandCoinLine } from 'react-icons/ri';
import styles from './Decision.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { GAME_STATE } from '../../models';
import Timer from '../components/timer';
import Control from '../components/button/Control';

function Controls({ enable }: { enable: boolean }) {
  const { insurance, pay, stand, hit, double, split, surrender } = useSelector((state: AppState) => state.decision);

  const config = [
    { title: 'insurance', icon: <RiSafeLine />, className: styles.indigo, trigger: insurance },
    { title: 'pay', icon: <RiHandCoinLine />, className: styles.orange, trigger: pay },
    { title: 'stand', icon: <Minus />, className: styles.red, trigger: stand },
    { title: 'hit', icon: <Plus />, className: styles.green, trigger: hit },
    { title: 'double', icon: <h3>2x</h3>, className: styles.yellow, trigger: double },
    { title: 'split', icon: <Code />, className: styles.teal, trigger: split },
    { title: 'surrender', icon: <Flag />, className: styles.gray, trigger: surrender },
  ];

  return (
    <div className={styles.section}>
      {config.map(({ title, icon, className, trigger }) => (
        <Control
          key={title}
          title={title}
          icon={icon}
          className={className}
          style={{ opacity: enable && trigger ? 1 : 0.3 }}
          enable={enable && trigger}
        />
      ))}
    </div>
  );
}

export default function Decision() {
  const user = useSelector((state: AppState) => state.user);
  const { state, countdown, turn } = useSelector((state: AppState) => state.game);

  const seat = useSelector((state: AppState) => state.seat);

  const isDealing = state === GAME_STATE.DEALING && countdown > 1;
  const isUserTurn = turn ? seat[turn.seat].player === user.name : false;

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

        <Controls enable={isUserTurn && isDealing} />

        <Timer total={10} countdown={countdown} />
      </div>
    </div>
  );
}
