import React, { PropsWithChildren, HTMLProps, memo } from "react";
import styles from "./Canvas.module.scss";

type Props = PropsWithChildren<HTMLProps<HTMLCanvasElement>>;

function Canvas({ children, ...props }: Props) {
  //
  function init(canvas: HTMLCanvasElement) {
    //
    if (children && typeof children === "function") {
      return children(canvas);
    }

    console.error(`Canvas children must be function`);
  }

  return (
    <canvas
      className={`${styles.shadow} ${styles.fitScreen}`}
      ref={init}
      {...props}
    />
  );
}

export default memo(Canvas);
