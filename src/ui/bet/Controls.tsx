import React from 'react';
import { X, CornerUpLeft, RotateCw } from 'react-feather';
import Control from './components/Control';
import styles from './Bet.module.scss';
import DEAL from './assets/icon/on_deal.png';

type Props = {
  onClear: () => void;
  onUndo: () => void;
  onDeal: () => void;
};

export default function Controls({ onClear, onUndo, onDeal }: Props) {
  return (
    <div className={styles.controls}>
      <Control title={'clear'} icon={<X />} onClick={onClear} />
      <Control title={'undo'} icon={<CornerUpLeft />} onClick={onUndo} />
      <Control
        title={'deal'}
        icon={<img src={DEAL} alt={DEAL} />}
        style={{ width: '48px', height: '48px' }}
        onClick={onDeal}
      />
      <Control title={'repeat'} icon={<RotateCw />} />
      <Control title={'double bet'} icon={<h3>2x</h3>} />
    </div>
  );
}
