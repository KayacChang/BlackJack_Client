import React from 'react';
import { CornerUpLeft, RotateCw } from 'react-feather';
import Chip from './Chip';
import Control from './Control';
import Timer from './Timer';
import styles from './Bet.module.scss';

import RED from './normal/red.png';
import GREEN from './normal/green.png';
import BLUE from './normal/blue.png';
import BLACK from './normal/black.png';
import PURPLE from './normal/purple.png';
import YELLOW from './normal/yellow.png';

export default function Bet() {
  return (
    <div className={styles.bet}>
      <h3 className={styles.title}>place your bets</h3>

      <div className={styles.section}>
        <Control title={'undo'} icon={<CornerUpLeft />} />

        <div className={styles.field}>
          <Chip src={RED} />
          <Chip src={GREEN} />
          <Chip src={BLUE} />
          <Chip src={BLACK} />
          <Chip src={PURPLE} />
          <Chip src={YELLOW} />
        </div>

        <Control title={'repeat'} icon={<RotateCw />} />
      </div>

      <Timer />
    </div>
  );
}
