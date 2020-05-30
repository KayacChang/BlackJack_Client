import React from 'react';
import { X, CornerUpLeft, RotateCw } from 'react-feather';
import Chip from './components/Chip';
import Control from './components/Control';
import Timer from '../../components/timer';
import styles from './Bet.module.scss';

import RED from './assets/normal/red.png';
import GREEN from './assets/normal/green.png';
import BLUE from './assets/normal/blue.png';
import BLACK from './assets/normal/black.png';
import PURPLE from './assets/normal/purple.png';
import YELLOW from './assets/normal/yellow.png';

import DEAL from './assets/icon/on_deal.png';

export default function Bet() {
  return (
    <div className={styles.bet}>
      <div>
        <h3>place your bets</h3>

        <div className={styles.section}>
          <div className={styles.field}>
            <Chip src={RED} />
            <Chip src={GREEN} />
            <Chip src={BLUE} />
            <Chip src={BLACK} />
            <Chip src={PURPLE} />
            <Chip src={YELLOW} />
          </div>
        </div>

        <Timer />

        <div className={styles.controls}>
          <Control title={'clear'} icon={<X />} />
          <Control title={'undo'} icon={<CornerUpLeft />} />
          <Control title={'deal'} icon={<img src={DEAL} alt={DEAL} />} style={{ width: '68px', height: '68px' }} />
          <Control title={'repeat'} icon={<RotateCw />} />
          <Control title={'double bet'} icon={<h3>2x</h3>} />
        </div>
      </div>
    </div>
  );
}
