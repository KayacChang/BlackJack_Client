import React from 'react';
import { X, CornerUpLeft, RotateCw } from 'react-feather';
import Chip from './components/Chip';
import Control from './components/Control';
import Timer from '../components/timer';
import styles from './Bet.module.scss';
import { CHIP } from '../../models';
import CHIP_IMG from './assets/chips';
import DEAL from './assets/icon/on_deal.png';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { choose, clearBet } from '../../store/actions';
import services from '../../services';

type Props = {
  max: number;
  min: number;
};

type ChipMeta = {
  type: CHIP;
  src: string;
};

const chips: ChipMeta[] = [
  { type: CHIP.RED, src: CHIP_IMG.NORMAL_RED },
  { type: CHIP.GREEN, src: CHIP_IMG.NORMAL_GREEN },
  { type: CHIP.BLUE, src: CHIP_IMG.NORMAL_BLUE },
  { type: CHIP.BLACK, src: CHIP_IMG.NORMAL_BLACK },
  { type: CHIP.PURPLE, src: CHIP_IMG.NORMAL_PURPLE },
  { type: CHIP.YELLOW, src: CHIP_IMG.NORMAL_YELLOW },
];

export default function Bet({ min, max }: Props) {
  const seats = useSelector((state: AppState) => state.seat);
  const { chosen } = useSelector((state: AppState) => state.bet);

  const dispatch = useDispatch();

  function clear() {
    dispatch(clearBet());

    seats.forEach(({ id }) => services.leaveSeat(id));
  }

  return (
    <div className={styles.bet}>
      <div>
        <h3>place your bets</h3>

        <div className={styles.section}>
          <div className={styles.field}>
            {chips.map(({ type, src }) => (
              <Chip
                key={type}
                selected={type === chosen?.chip}
                src={src}
                bet={type * min}
                onClick={() => dispatch(choose({ chip: type, amount: type * min }))}
              />
            ))}
          </div>
        </div>

        <Timer />

        <div className={styles.controls}>
          <Control title={'clear'} icon={<X />} onClick={clear} />
          <Control title={'undo'} icon={<CornerUpLeft />} />
          <Control title={'deal'} icon={<img src={DEAL} alt={DEAL} />} style={{ width: '48px', height: '48px' }} />
          <Control title={'repeat'} icon={<RotateCw />} />
          <Control title={'double bet'} icon={<h3>2x</h3>} />
        </div>
      </div>
    </div>
  );
}
