import React, { MouseEvent } from 'react';
import { X, CornerUpLeft, RotateCw } from 'react-feather';
import Chip from './components/Chip';
import Control from './components/Control';
import Timer from '../components/timer';
import styles from './Bet.module.scss';

import { CHIP } from '../../models';

import RED from './assets/normal/red.png';
import GREEN from './assets/normal/green.png';
import BLUE from './assets/normal/blue.png';
import BLACK from './assets/normal/black.png';
import PURPLE from './assets/normal/purple.png';
import YELLOW from './assets/normal/yellow.png';

import DEAL from './assets/icon/on_deal.png';

type Props = {
  max: number;
  min: number;
};

type ChipMeta = {
  type: CHIP;
  src: string;
  bet: number;
};

const chips: ChipMeta[] = [
  //
  { type: CHIP.RED, src: RED, bet: 1 },
  { type: CHIP.GREEN, src: GREEN, bet: 5 },
  { type: CHIP.BLUE, src: BLUE, bet: 10 },
  { type: CHIP.BLACK, src: BLACK, bet: 50 },
  { type: CHIP.PURPLE, src: PURPLE, bet: 100 },
  { type: CHIP.YELLOW, src: YELLOW, bet: 500 },
];

function setChipClick(meta: ChipMeta) {
  return function onChipClick() {
    console.log(meta);
  };
}

export default function Bet({ min, max }: Props) {
  return (
    <div className={styles.bet}>
      <div>
        <h3>place your bets</h3>

        <div className={styles.section}>
          <div className={styles.field}>
            {chips.map(({ type, src, bet }) => (
              <Chip key={type} src={src} bet={bet * min} onClick={setChipClick({ type, src, bet })} />
            ))}
          </div>
        </div>

        <Timer />

        <div className={styles.controls}>
          <Control title={'clear'} icon={<X />} />
          <Control title={'undo'} icon={<CornerUpLeft />} />
          <Control title={'deal'} icon={<img src={DEAL} alt={DEAL} />} style={{ width: '48px', height: '48px' }} />
          <Control title={'repeat'} icon={<RotateCw />} />
          <Control title={'double bet'} icon={<h3>2x</h3>} />
        </div>
      </div>
    </div>
  );
}
