import React, { useState, ChangeEvent } from "react";
import styles from "./Slider.module.scss";

export default function Slider({ className }: DivProps<{}>) {
  const min = 0;
  const max = 100;

  const [value, setValue] = useState(0);

  function handle(event: ChangeEvent) {
    //
    const el = event.target as HTMLInputElement;

    const value = Number(el.value);

    setValue(value);
  }

  function getPos(value: number) {
    //
    const percentage = Number(((value - min) * 100) / (max - min));

    const newPosition = 15 - percentage * 0.4;

    return `calc(${percentage}% + (${newPosition}px))`;
  }

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <input
        className={styles.slider}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handle}
      />
      <output className={styles.output} style={{ left: getPos(value) }}>
        {value}
      </output>
    </div>
  );
}
