import React, { PropsWithChildren, HTMLAttributes } from 'react';

type Div<T> = PropsWithChildren<T & HTMLAttributes<HTMLDivElement>>;

type Props = Div<{
  direction: 'top' | 'bottom' | 'left' | 'right';
  color: string;
  len: number;
}>;

export default function Triangle({ direction, len, color }: Props) {
  //
  const diff = 12;

  const styles = {
    width: 0,
    height: 0,
  };

  if (direction === 'top') {
    //
    const min = Math.round(len / diff);
    const max = len;

    Object.assign(styles, {
      borderTop: `${max}px solid transparent`,
      borderBottom: `${0}px solid transparent`,
      borderLeft: `${min}px solid ${color}`,
      borderRight: `${min}px solid ${color}`,
    });
  }

  if (direction === 'bottom') {
    //
    const min = Math.round(len / diff);
    const max = len;

    Object.assign(styles, {
      borderTop: `${0}px solid transparent`,
      borderBottom: `${max}px solid transparent`,
      borderLeft: `${min}px solid ${color}`,
      borderRight: `${min}px solid ${color}`,
    });
  }

  if (direction === 'left') {
    //
    const min = Math.round(len / diff);
    const max = len;

    Object.assign(styles, {
      borderTop: `${min}px solid transparent`,
      borderBottom: `${min}px solid transparent`,
      borderLeft: `${0}px solid ${color}`,
      borderRight: `${max}px solid ${color}`,
    });
  }

  if (direction === 'right') {
    //
    const min = Math.round(len / diff);
    const max = len;

    Object.assign(styles, {
      borderTop: `${min}px solid transparent`,
      borderBottom: `${min}px solid transparent`,
      borderLeft: `${max}px solid ${color}`,
      borderRight: `${0}px solid ${color}`,
    });
  }

  return <div style={styles} />;
}
