import React, { PropsWithChildren, HTMLAttributes } from "react";
import styles from "./Flex.module.scss";

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export function Center({ children, ...props }: Props) {
  //
  return (
    <div className={styles.center} {...props}>
      {children}
    </div>
  );
}
