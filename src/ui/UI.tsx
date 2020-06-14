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
  const { state } = useSelector((state: AppState) => state.game);

  if (state.type === GAME.BET_START) {
    return <Bet />;
  }

  if (state.type === GAME.TURN) {
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
      {/* <Control /> */}
    </div>
  );
}
