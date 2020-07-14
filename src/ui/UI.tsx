import React from 'react';
import Menu from './menu';
import Status from './status';
import Detail from './detail';
import Bet from './bet';
import Decision from './decision';
import { useMatch } from 'react-router-dom';

export default function UI() {
  const inLobby = useMatch('/lobby');

  return (
    <div className="fixedPage" style={{ pointerEvents: 'none' }}>
      <Menu />
      <Status />
      {!inLobby && <Detail />}
      {!inLobby && <Decision />}
      {!inLobby && <Bet />}
    </div>
  );
}
