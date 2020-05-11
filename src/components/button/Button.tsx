import React, { PropsWithChildren, HTMLAttributes } from "react";
import styles from "./Button.module.scss";

type Props = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

export function Button({ children, ...props }: Props) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
