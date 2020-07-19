import React from 'react';
import Menu from './menu';
import Status from './status';
import Detail from './detail';
import Bet from './bet';
import Decision from './decision';
import { useLocation } from 'react-router-dom';

export default function UI() {
  const location = useLocation();

  if (location.pathname.includes('lobby')) {
    return (
      <div className="fixedPage">
        <Status />
        <Menu />
      </div>
    );
  }

  if (location.pathname.includes('game')) {
    return (
      <div className="fixedPage">
        <Decision />
        <Bet />
        <Status />
        <Detail />
        <Menu />
      </div>
    );
  }

  return <></>;
}
