import React from "react";
import styles from "./Button.module.scss";

export function Button({ children, className, ...props }: ButtonProps<{}>) {
  //
  const _className = [styles.button, className].filter(Boolean).join(" ");

  return (
    <button className={_className} {...props}>
      {children}
    </button>
  );
}
