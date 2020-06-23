import React from 'react';
import Menu from './menu';
import Status from './status';
import Detail from './detail';
import Bet from './bet';

export default function UI() {
  return (
    <div className="fixedPage" style={{ pointerEvents: 'none' }}>
      <Menu />
      <Status />
      <Detail />
      <Bet />
    </div>
  );
}
