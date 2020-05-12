import React, { PropsWithChildren, HTMLAttributes } from "react";
import styles from "./Flex.module.scss";

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
export function Center({ children, className, ...props }: Props) {
  //
  const _className = [styles.center, className].filter(Boolean).join(" ");

  return (
    <Flex className={_className} {...props}>
      {children}
    </Flex>
  );
}

export function Flex({ children, className, ...props }: Props) {
  //
  const _className = [styles.default, className].filter(Boolean).join(" ");

  return (
    <div className={_className} {...props}>
      {children}
    </div>
  );
}
