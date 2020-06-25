import React, { useState, useEffect } from 'react';
import Timer from '../components/timer';
import styles from './Bet.module.scss';
import { CHIP } from '../../models';
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
  const { countdown } = useSelector((state: AppState) => state.game);
  const { history, previous } = useSelector((state: AppState) => state.bet);

  const deadline = 1;

  const isBetting = countdown > deadline;
  const isUserJoin = Object.values(seats).some(({ player }) => user.name === player);

  const [hasCommited, setCommited] = useState(false);
  useEffect(() => {
    const isCommited = Object.values(seats)
      .filter(({ player }) => player === user.name)
      .every(({ commited }) => commited);

    setCommited(isBetting && isCommited);
  }, [isBetting, seats, user]);

  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setOpacity(0);

    if (hasCommited) {
      setOpacity(0.3);
      return;
    }

    if (!isBetting) {
      setOpacity(0);
      return;
    }

    if (isUserJoin && isBetting) {
      setOpacity(1);
      return;
    }
  }, [hasCommited, isBetting, isUserJoin]);

  useEffect(() => {
    //
    if (countdown === deadline && !hasCommited && history.length > 0) {
      onDeal();
    }
  }, [countdown, hasCommited, history]);

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
    <div className={styles.bet} style={{ opacity }}>
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
