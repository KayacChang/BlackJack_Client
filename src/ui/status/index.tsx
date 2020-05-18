import React, { useState } from "react";
import style from "./Status.module.scss";
import { Button } from "../../components/button/Button";
import { currency } from "../../utils";

type FieldProps = ButtonProps<{
  title: string;
  value: string;
}>;

function Field({ title, value }: FieldProps) {
  return (
    <Button className={style.field}>
      <h5>{title}</h5>
      <span>{value}</span>
    </Button>
  );
}

export default function Status() {
  //
  const [totalBet] = useState(123456789);
  const [balance] = useState(123456789);

  return (
    <div className={style.status}>
      <Field title={"total bet"} value={currency(totalBet)} />
      <Field title={"balance"} value={currency(balance)} />
    </div>
  );
}
