import React from 'react';
import { X, CornerUpLeft, RotateCw } from 'react-feather';
import Chip from './components/Chip';
import Control from './components/Control';
import Timer from '../components/timer';
import styles from './Bet.module.scss';
import { CHIP } from '../../models';
import CHIP_IMG from './assets/chips';
import DEAL from './assets/icon/on_deal.png';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

type Props = {
  max: number;
  min: number;
};

type ChipMeta = {
  type: CHIP;
  normal: string;
  bet: number;
};

const chips: ChipMeta[] = [
  //
  { type: CHIP.RED, normal: CHIP_IMG.NORMAL_RED, bet: 1 },
  { type: CHIP.GREEN, normal: CHIP_IMG.NORMAL_GREEN, bet: 5 },
  { type: CHIP.BLUE, normal: CHIP_IMG.NORMAL_BLUE, bet: 10 },
  { type: CHIP.BLACK, normal: CHIP_IMG.NORMAL_BLACK, bet: 50 },
  { type: CHIP.PURPLE, normal: CHIP_IMG.NORMAL_PURPLE, bet: 100 },
  { type: CHIP.YELLOW, normal: CHIP_IMG.NORMAL_YELLOW, bet: 500 },
];

export default function Bet({ min, max }: Props) {
  const { chosen } = useSelector((state: AppState) => state.bet);

  return (
    <div className={styles.bet}>
      <div>
        <h3>place your bets</h3>

        <div className={styles.section}>
          <div className={styles.field}>
            {chips.map(({ type, normal, bet }) => (
              <Chip type={type} selected={type === chosen} key={type} src={normal} bet={bet * min} />
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
