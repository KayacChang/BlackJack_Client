import React from 'react';
import Chip from './components/Chip';
import styles from './Bet.module.scss';
import { CHIP } from '../../models';
import CHIP_IMG from './assets/chips';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

type Props = {
  onSelect: (chip: CHIP, amount: number) => () => void;
};

const chips = [
  { type: CHIP.RED, src: CHIP_IMG.NORMAL_RED },
  { type: CHIP.GREEN, src: CHIP_IMG.NORMAL_GREEN },
  { type: CHIP.BLUE, src: CHIP_IMG.NORMAL_BLUE },
  { type: CHIP.BLACK, src: CHIP_IMG.NORMAL_BLACK },
  { type: CHIP.PURPLE, src: CHIP_IMG.NORMAL_PURPLE },
  { type: CHIP.YELLOW, src: CHIP_IMG.NORMAL_YELLOW },
];

export default function Chips({ onSelect }: Props) {
  const min = useSelector((state: AppState) => state.game.minBet);
  const chip = useSelector((state: AppState) => state.bet.chosen?.chip);

  return (
    <div className={styles.section}>
      <div className={styles.field}>
        {chips.map(({ type, src }) => (
          <Chip
            //
            key={type}
            selected={type === chip}
            src={src}
            bet={type * min}
            onClick={onSelect(type, type * min)}
          />
        ))}
      </div>
    </div>
  );
}