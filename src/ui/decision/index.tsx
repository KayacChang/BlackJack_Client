import React, { useEffect, useState } from 'react';
import { Plus, Minus, Code, Flag } from 'react-feather';
import { RiSafeLine, RiHandCoinLine } from 'react-icons/ri';
import styles from './Decision.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { GAME_STATE, DECISION } from '../../models';
import Timer from '../components/timer';
import Control from '../components/button/Control';
import services from '../../services';

function Controls({ enable }: { enable: boolean }) {
  const { insurance, pay, stand, hit, double, split, surrender } = useSelector((state: AppState) => state.decision);

  const config = [
    {
      title: 'insurance',
      icon: <RiSafeLine />,
      className: styles.indigo,
      trigger: insurance,
      item: DECISION.INSURANCE,
    },
    { title: 'pay', icon: <RiHandCoinLine />, className: styles.orange, trigger: pay, item: DECISION.PAY },
    { title: 'stand', icon: <Minus />, className: styles.red, trigger: stand, item: DECISION.STAND },
    { title: 'hit', icon: <Plus />, className: styles.green, trigger: hit, item: DECISION.HIT },
    { title: 'double', icon: <h3>2x</h3>, className: styles.yellow, trigger: double, item: DECISION.DOUBLE },
    { title: 'split', icon: <Code />, className: styles.teal, trigger: split, item: DECISION.SPLIT },
    { title: 'surrender', icon: <Flag />, className: styles.gray, trigger: surrender, item: DECISION.SURRENDER },
  ];

  function onClick(item: DECISION) {
    return async function () {
      const action = await services.decision(item);

      console.log(action);
    };
  }

  return (
    <div className={styles.section}>
      {config.map(({ title, icon, className, trigger, item }) => (
        <Control
          key={title}
          title={title}
          icon={icon}
          className={className}
          style={{ opacity: enable && trigger ? 1 : 0.3 }}
          enable={enable && trigger}
          onClick={onClick(item)}
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
