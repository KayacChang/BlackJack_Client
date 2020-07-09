import React, { Dispatch } from 'react';
import { Plus, Minus, Code, Flag } from 'react-feather';
import { RiSafeLine, RiHandCoinLine } from 'react-icons/ri';
import styles from './Decision.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import store, { AppState } from '../../store';
import { DECISION } from '../../models';
import Control from '../components/button/Control';
import services from '../../services';
import { updateSeats } from '../../store/actions';

type Props = {
  enable: boolean;
};

const config = [
  { item: DECISION.INSURANCE, icon: <RiSafeLine />, className: styles.indigo },
  { item: DECISION.PAY, icon: <RiHandCoinLine />, className: styles.orange },
  { item: DECISION.STAND, icon: <Minus />, className: styles.red },
  { item: DECISION.HIT, icon: <Plus />, className: styles.green },
  { item: DECISION.DOUBLE, icon: <h3>2x</h3>, className: styles.yellow },
  { item: DECISION.SPLIT, icon: <Code />, className: styles.teal },
  { item: DECISION.SURRENDER, icon: <Flag />, className: styles.gray },
];

function onSplit() {
  const { game, seat } = store.getState();

  const seatID = game.turn?.seat;
  if (!seatID) {
    return;
  }

  return updateSeats({ ...seat, [seatID]: { ...seat[seatID], split: true } });
}

function onClick(dispatch: Dispatch<any>, item: DECISION) {
  return async function () {
    const action = await services.decision(item);

    if (action === DECISION.SPLIT) {
      dispatch(onSplit());
    }
  };
}

export default function Controls({ enable }: Props) {
  const dispatch = useDispatch();
  const decisions = useSelector((state: AppState) => state.user.decisions);

  return (
    <div className={styles.section}>
      {config.map(({ item, icon, className }) => {
        const trigger = decisions.includes(item);

        return (
          <Control
            key={item}
            title={item}
            icon={icon}
            className={className}
            style={{ opacity: enable && trigger ? 1 : 0.3 }}
            enable={enable && trigger}
            onClick={onClick(dispatch, item)}
          />
        );
      })}
    </div>
  );
}
