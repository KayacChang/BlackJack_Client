import React from "react";
import styles from "./Settings.module.scss";
import { VolumeX, Volume2 } from "react-feather";
import { Slider } from "../../components/input";

function Volume() {
  return (
    <div className={styles.volume}>
      <VolumeX color="white" />
      <Slider className={styles.slider} />
      <Volume2 color="white" />
    </div>
  );
}

export default function Settings() {
  return (
    <div className={styles.settings}>
      <section>
        <h3>audio</h3>
        <span>volume</span>
        <Volume />
      </section>
    </div>
  );
}
