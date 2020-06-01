import React from 'react';
import Menu from './menu';
import Status from './status';
import Detail from './detail';
import Bet from './bet';
import Decision from './decision';

export default function UI() {
  //
  return (
    <div className="fixedPage">
      <Menu />
      <Status />
      <Detail />
      {/* <Bet /> */}
      {/* <Decision /> */}
    </div>
  );
}
