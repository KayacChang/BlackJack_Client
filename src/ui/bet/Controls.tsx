import React from 'react';
import { X, CornerUpLeft, RotateCw } from 'react-feather';
import Control from './components/Control';
import styles from './Bet.module.scss';
import DEAL from './assets/icon/on_deal.png';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

type Props = {
  onClear: () => void;
  onUndo: () => void;
  onDeal: () => void;
  onRepeat: () => void;
  enable: boolean;
};

export default function Controls({ onClear, onUndo, onDeal, onRepeat, enable }: Props) {
  const previous = useSelector((state: AppState) => state.bet.previous);
  const isRepeatEnable = previous.length > 0 && enable;

  return (
    <div className={styles.controls}>
      <Control title={'clear'} icon={<X />} onClick={onClear} enable={enable} />
      <Control title={'undo'} icon={<CornerUpLeft />} onClick={onUndo} enable={enable} />
      <Control
        title={'deal'}
        icon={<img src={DEAL} alt={DEAL} />}
        style={{ width: '48px', height: '48px' }}
        onClick={onDeal}
        enable={enable}
      />
      <Control
        title={'repeat'}
        icon={<RotateCw />}
        style={{ opacity: isRepeatEnable ? 1 : 0.3 }}
        onClick={onRepeat}
        enable={isRepeatEnable}
      />
      <Control title={'double bet'} icon={<h3>2x</h3>} enable={enable} />
    </div>
  );
}
