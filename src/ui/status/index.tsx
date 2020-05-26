import React, { useState, ReactNode } from 'react';
import style from './Status.module.scss';
import { currency } from '../../utils';
import { CreditCard, Database } from 'react-feather';

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
  //
  const [totalBet] = useState(123456789);
  const [balance] = useState(123456789);

  return (
    <div className={style.status}>
      <Field title={'balance'} value={currency(balance)} icon={<CreditCard />} />
      <Field title={'total bet'} value={currency(totalBet)} icon={<Database />} />
    </div>
  );
}
