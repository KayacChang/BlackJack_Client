import React, { ReactNode, PropsWithChildren, HTMLAttributes } from 'react';
import style from './Status.module.scss';
import { currency } from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faCoins } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

type ButtonProps<T> = PropsWithChildren<T & HTMLAttributes<HTMLButtonElement>>;

type FieldProps = ButtonProps<{
  icon: ReactNode;
  title: string;
  value: string;
}>;

function Field({ icon, title, value }: FieldProps) {
  return (
    <div className={style.field}>
      {icon}
      <div>
        <h5>{title}</h5>
        <span>{value}</span>
      </div>
    </div>
  );
}

export default function Status() {
  const { balance, totalBet } = useSelector((state: AppState) => state.user);

  return (
    <div className={style.status}>
      <Field title={'balance'} value={currency(balance)} icon={<FontAwesomeIcon icon={faWallet} />} />
      <Field title={'total bet'} value={currency(totalBet)} icon={<FontAwesomeIcon icon={faCoins} />} />
    </div>
  );
}
