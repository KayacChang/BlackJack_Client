import React from 'react';
import { Menu as IconMenu, CornerUpRight, X } from 'react-feather';
import { Button } from '../../../components/button/Button';
import styles from './Button.module.scss';

// ===== Trigger =====
type Props = ButtonProps<{
  open: boolean;
}>;

export function Trigger({ open, style, onClick }: Props) {
  //
  const _className = [styles.trigger, open && styles.open].filter(Boolean).join(' ');

  return (
    <Button className={_className} onClick={onClick} style={style}>
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

export function Option({ open, children, onClick }: Props) {
  //
  const _className = [
    //
    styles.option,
    open && styles.open,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Button className={_className} onClick={onClick}>
      {children}
    </Button>
  );
}
