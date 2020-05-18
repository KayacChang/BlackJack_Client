import React from "react";
import { Menu as IconMenu, CornerUpRight, X } from "react-feather";
import { Button } from "../../../components/button/Button";
import styles from "./Button.module.scss";

// ===== Trigger =====
type TriggerProps = ButtonProps<{
  open: boolean;
}>;

export function Trigger({ open, style, onClick }: TriggerProps) {
  return (
    <Button className={styles.trigger} onClick={onClick} style={style}>
      {open ? <CornerUpRight /> : <IconMenu />}
    </Button>
  );
}

export function Close({ style, onClick }: ButtonProps<{}>) {
  return (
    <Button className={styles.trigger} onClick={onClick} style={style}>
      <X />
    </Button>
  );
}

export function Option({ children, onClick }: ButtonProps<{}>) {
  //
  const _className = [styles.option].filter(Boolean).join(" ");

  return (
    <button className={_className} onClick={onClick}>
      {children}
    </button>
  );
}
