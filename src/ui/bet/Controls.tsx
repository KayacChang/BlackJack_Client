import React, { useEffect, useCallback } from 'react';
import { X, CornerUpLeft, RotateCw } from 'react-feather';
import Control from '../components/button/Control';
import styles from './Bet.module.scss';
import DEAL from './assets/icon/on_deal.png';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { clearBet, undoBet, replaceBet, addBet } from '../../store/actions';
import services from '../../services';
import { throttleBy } from '../../utils';

type Props = {
  enable: boolean;
  setCommited: (flag: boolean) => void;
};

export default function Controls({ enable, setCommited }: Props) {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const seats = useSelector((state: AppState) => state.seat);
  const countdown = useSelector((state: AppState) => state.game.countdown);

  const history = useSelector((state: AppState) => state.bet.history);
  const isDealable = history.length > 0 && enable;

  const previous = useSelector((state: AppState) => state.bet.previous);
  const isRepeatable = previous.length > 0 && enable;

  const isBetting = countdown > 1;

  async function onClear() {
    if (!isBetting) {
      return;
    }

    const tasks = Object.entries(seats)
      .filter(([, seat]) => seat.player === user.name && !seat.commited)
      .map(([id]) => services.leaveSeat(Number(id)));

    await Promise.all(tasks);

    dispatch(clearBet(user));
  }

  function onUndo() {
    if (!isBetting) {
      return;
    }

    const last = history[history.length - 1];

    last && dispatch(undoBet(last));
  }

  const onDeal = useCallback(
    throttleBy(async function () {
      if (!enable || !isBetting || history.length <= 0) {
        return;
      }

      await services.deal();
    }),
    [enable, isBetting, history]
  );

  useEffect(() => {
    enable && countdown === 2 && onDeal();
  }, [enable, countdown, onDeal]);

  async function onRepeat() {
    if (!enable) {
      return;
    }

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
    if (!isBetting) {
      return;
    }

    dispatch(clearBet(user));

    [...history, ...history].forEach((bet) => dispatch(addBet(bet)));
  }

  return (
    <div className={styles.controls}>
      <Control title={'clear'} icon={<X />} onClick={onClear} enable={enable} />
      <Control
        title={'undo'}
        style={{ opacity: isDealable ? 1 : 0.3 }}
        icon={<CornerUpLeft />}
        onClick={onUndo}
        enable={isDealable}
      />
      <Control
        title={'deal'}
        icon={<img src={DEAL} alt={DEAL} />}
        style={{ width: '48px', height: '48px', opacity: isDealable ? 1 : 0.3 }}
        onClick={onDeal}
        enable={isDealable}
      />
      <Control
        title={'repeat'}
        icon={<RotateCw />}
        style={{ opacity: isRepeatable ? 1 : 0.3 }}
        onClick={onRepeat}
        enable={isRepeatable}
      />
      <Control
        title={'double'}
        style={{ width: '48px', height: '48px', opacity: isDealable ? 1 : 0.3 }}
        icon={<h3>2x</h3>}
        onClick={onDouble}
        enable={isDealable}
      />
    </div>
  );
}
