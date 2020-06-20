import React from 'react';
import Menu from './menu';
import Status from './status';
import Detail from './detail';
import Bet from './bet';
import Decision from './decision';
import { useSelector } from 'react-redux';
import { AppState } from '../store';
import { GAME } from '../models';

function Control() {
  const { game, user, seat } = useSelector((state: AppState) => state);

  const isUserJoin = seat.some(({ player }) => user.name === player);

  if (!isUserJoin) {
    return <></>;
  }

  if (game.state.type === GAME.BET_START) {
    return <Bet min={game.minBet} max={game.maxBet} />;
  }

  if (game.state.type === GAME.TURN) {
    return <Decision />;
  }

  return <></>;
}

export default function UI() {
  return (
    <div className="fixedPage" style={{ pointerEvents: 'none' }}>
      <Menu />
      <Status />
      <Detail />
      <Bet min={100} max={500000} />
      {/* <Control /> */}
    </div>
  );
}
