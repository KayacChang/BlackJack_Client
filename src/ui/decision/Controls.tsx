import React from 'react';
import { Plus, Minus, Code, Flag } from 'react-feather';
import { RiSafeLine, RiHandCoinLine } from 'react-icons/ri';
import styles from './Decision.module.scss';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { DECISION } from '../../models';
import Control from '../components/button/Control';
import services from '../../services';

type Props = {
  enable: boolean;
  setCommited: (flag: boolean) => void;
};

export default function Controls({ enable, setCommited }: Props) {
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
    //
    return async function () {
      setCommited(true);

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
