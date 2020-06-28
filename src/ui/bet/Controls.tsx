import React from 'react';
import { X, CornerUpLeft, RotateCw } from 'react-feather';
import Control from '../components/button/Control';
import styles from './Bet.module.scss';
import DEAL from './assets/icon/on_deal.png';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

type Props = {
  onClear: () => void;
  onUndo: () => void;
  onDeal: () => void;
  onRepeat: () => void;
  onDouble: () => void;
  enable: boolean;
};

export default function Controls({ onClear, onUndo, onDeal, onRepeat, onDouble, enable }: Props) {
  const history = useSelector((state: AppState) => state.bet.history);
  const isDealable = history.length > 0 && enable;

  const previous = useSelector((state: AppState) => state.bet.previous);
  const isRepeatable = previous.length > 0 && enable;

  return (
    <div className={styles.controls}>
      <Control title={'clear'} icon={<X />} onClick={onClear} enable={enable} />
      <Control
        title={'undo'}
        style={{ opacity: isDealable ? 1 : 0.3 }}
        icon={<CornerUpLeft />}
        onClick={onUndo}
        enable={isDealable}
      />
      <Control
        title={'deal'}
        icon={<img src={DEAL} alt={DEAL} />}
        style={{ width: '48px', height: '48px', opacity: isDealable ? 1 : 0.3 }}
        onClick={onDeal}
        enable={isDealable}
      />
      <Control
        title={'repeat'}
        icon={<RotateCw />}
        style={{ opacity: isRepeatable ? 1 : 0.3 }}
        onClick={onRepeat}
        enable={isRepeatable}
      />
      <Control
        title={'double'}
        style={{ width: '48px', height: '48px', opacity: isDealable ? 1 : 0.3 }}
        icon={<h3>2x</h3>}
        onClick={onDouble}
        enable={isDealable}
      />
    </div>
  );
}
