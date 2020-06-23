import React, { useState, useEffect } from 'react';
import Timer from '../components/timer';
import styles from './Bet.module.scss';
import { CHIP, GAME_STATE } from '../../models';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { choose, clearBet, undoBet } from '../../store/actions';
import services from '../../services';
import Controls from './Controls';
import Chips from './Chips';

function useUserJoin() {
  const seats = useSelector((state: AppState) => state.seat);
  const user = useSelector((state: AppState) => state.user);

  return Object.values(seats).some(({ player }) => user.name === player);
}

function useGameState() {
  const state = useSelector((state: AppState) => state.game.state);

  return state === GAME_STATE.BETTING;
}

export default function Bet() {
  const dispatch = useDispatch();

  const history = useSelector((state: AppState) => state.bet.history);
  const isBetting = useGameState();
  const isUserJoin = useUserJoin();

  const [hasCommited, setCommited] = useState(false);
  useEffect(() => setCommited(false), [isBetting]);

  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    const opacity = hasCommited ? 0.3 : isBetting && isUserJoin ? 1 : 0;

    setOpacity(opacity);
  }, [hasCommited, isBetting, isUserJoin]);

  function onSelect(chip: CHIP, amount: number) {
    return function () {
      if (!isBetting || !isUserJoin || hasCommited) return;

      dispatch(choose({ chip, amount }));
    };
  }

  async function onClear() {
    if (!isBetting || !isUserJoin || hasCommited) return;

    dispatch(clearBet());
  }

  function onUndo() {
    if (!isBetting || !isUserJoin || hasCommited) return;

    const last = history[history.length - 1];

    last && dispatch(undoBet());
  }

  async function onDeal() {
    if (!isBetting || !isUserJoin || hasCommited) return;

    await services.deal();

    setCommited(true);
  }

  return (
    <div className={styles.bet} style={{ opacity }}>
      <div>
        <h3>place your bets</h3>

        <Chips onSelect={onSelect} />

        <Timer />

        <Controls onClear={onClear} onUndo={onUndo} onDeal={onDeal} />
      </div>
    </div>
  );
}
