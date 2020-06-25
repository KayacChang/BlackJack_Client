import React, { useState, useEffect } from 'react';
import Timer from '../components/timer';
import styles from './Bet.module.scss';
import { CHIP, GAME_STATE } from '../../models';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { choose, clearBet, undoBet, replaceBet } from '../../store/actions';
import services from '../../services';
import Controls from './Controls';
import Chips from './Chips';

export default function Bet() {
  const dispatch = useDispatch();

  const user = useSelector((state: AppState) => state.user);
  const seats = useSelector((state: AppState) => state.seat);
  const { state, countdown } = useSelector((state: AppState) => state.game);
  const { history, previous } = useSelector((state: AppState) => state.bet);

  const isBetting = state === GAME_STATE.BETTING;
  const isUserJoin = Object.values(seats).some(({ player }) => user.name === player);

  const [hasCommited, setCommited] = useState(false);
  useEffect(() => setCommited(false), [isBetting]);

  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    const opacity = hasCommited ? 0.3 : isBetting && isUserJoin ? 1 : 0;

    setOpacity(opacity);
  }, [hasCommited, isBetting, isUserJoin]);

  const enable = isBetting && isUserJoin && !hasCommited;

  function onSelect(chip: CHIP, amount: number) {
    return function () {
      if (!enable) return;

      dispatch(choose({ chip, amount }));
    };
  }

  async function onClear() {
    dispatch(clearBet(user));
  }

  function onUndo() {
    const last = history[history.length - 1];

    last && dispatch(undoBet(last));
  }

  async function onDeal() {
    await services.deal();

    setCommited(true);
  }

  function onRepeat() {
    dispatch(clearBet(user));
    dispatch(replaceBet(previous));
  }

  return (
    <div className={styles.bet} style={{ opacity }}>
      <div>
        <h3>place your bets</h3>

        <Chips onSelect={onSelect} />

        <Timer total={20} countdown={countdown} />

        <Controls enable={enable} onClear={onClear} onUndo={onUndo} onDeal={onDeal} onRepeat={onRepeat} />
      </div>
    </div>
  );
}
