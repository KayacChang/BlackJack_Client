import React from "react";
import { Menu as Icon } from "react-feather";
import { Button } from "../../components/button/Button";
import styles from "./Menu.module.scss";
import { useTrigger } from "../../states";

function Drawer() {
  return <div className={styles.drawer} />;
}

function Trigger({ onClick }: ButtonProps) {
  return (
    <Button style={{ zIndex: 1, margin: "16px" }} onClick={onClick}>
      <Icon color="white" />
    </Button>
  );
}

export default function Menu() {
  //
  const [open, trigger] = useTrigger();

  return (
    <div className={styles.menu}>
      <Trigger onClick={() => trigger()} />

      {open && <Drawer />}
    </div>
  );
}
