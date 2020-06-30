import React, { useState, useEffect, useCallback } from 'react';
import Timer from '../components/timer';
import styles from './Bet.module.scss';
import { CHIP, GAME_STATE } from '../../models';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { choose, clearBet, undoBet, replaceBet, addBet } from '../../store/actions';
import services from '../../services';
import Controls from './Controls';
import Chips from './Chips';

export default function Bet() {
  const dispatch = useDispatch();

  const user = useSelector((state: AppState) => state.user);
  const seats = useSelector((state: AppState) => state.seat);
  const { state, countdown } = useSelector((state: AppState) => state.game);
  const { history, previous } = useSelector((state: AppState) => state.bet);

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

  useEffect(() => {
    //
    if (countdown === 2 && isBetting && !hasCommited && history.length > 0) {
      onDeal();
    }
  }, [countdown, isBetting, hasCommited, history]);

  const enable = isBetting && isUserJoin && !hasCommited;

  function onSelect(chip: CHIP, amount: number) {
    return function () {
      if (!enable) return;

      dispatch(choose({ chip, amount }));
    };
  }

  async function onClear() {
    const tasks = Object.entries(seats)
      .filter(([, seat]) => seat.player === user.name && !seat.commited)
      .map(([id]) => services.leaveSeat(Number(id)));

    await Promise.all(tasks);

    dispatch(clearBet(user));
  }

  function onUndo() {
    const last = history[history.length - 1];

    last && dispatch(undoBet(last));
  }

  async function onDeal() {
    await services.deal();
  }

  async function onRepeat() {
    dispatch(clearBet(user));

    const tasks = previous.map(({ seat }) => {
      if (!seat) {
        return Promise.resolve();
      }

      if (seats[seat].player === user.name) {
        return Promise.resolve();
      }

      return services.joinSeat(seat);
    });

    await Promise.all(tasks);

    dispatch(replaceBet(previous));
  }

  function onDouble() {
    dispatch(clearBet(user));

    [...history, ...history].forEach((bet) => dispatch(addBet(bet)));
  }

  return (
    <div className={styles.bet} onTransitionEnd={onTransitionEnd} style={{ opacity, display }}>
      <div>
        <h3>place your bets</h3>

        <Chips onSelect={onSelect} />

        <Timer total={20} countdown={countdown} />

        <Controls
          enable={enable}
          onClear={onClear}
          onUndo={onUndo}
          onDeal={onDeal}
          onRepeat={onRepeat}
          onDouble={onDouble}
        />
      </div>
    </div>
  );
}
