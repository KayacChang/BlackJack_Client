import React, { ReactNode, MouseEvent } from "react";
import { Menu as IconMenu, CornerUpRight } from "react-feather";
import { Button } from "../../components/button/Button";
import { useTrigger } from "../../states";
import styles from "./Menu.module.scss";
import { useSpring, animated } from "react-spring";
import { easeCubic } from "d3-ease";
import Settings from "./Settings";
import History from "./History";
import GameRules from "./GameRules";

// ===== Drawer =====

type Option = {
  icon: ReactNode;
  title: string;
  onClick: (event: MouseEvent) => void;
};

type DrawerProps = DivProps<{
  options: Option[];
  open: boolean;
}>;

function OptionButton({ children, onClick }: ButtonProps<{}>) {
  return (
    <button className={styles.option} onClick={onClick}>
      {children}
    </button>
  );
}

function Logo() {
  return <div className={styles.logo}></div>;
}

function Drawer({ open, options }: DrawerProps) {
  //
  const anim = useSpring({
    opacity: open ? 1 : 0,
    transform: `translate3d(${open ? 0 : 100}%,0,0)`,
    config: {
      duration: 160,
      easing: easeCubic,
    },
  });

  return (
    <animated.div className={styles.drawer} style={anim}>
      <Logo />

      {options.map(({ icon, title, onClick }) => (
        <OptionButton key={title} onClick={onClick}>
          {icon}
          <h4>{title}</h4>
        </OptionButton>
      ))}
    </animated.div>
  );
}

// ===== Trigger =====
type TriggerProps = ButtonProps<{
  open: boolean;
}>;

function Trigger({ open, onClick }: TriggerProps) {
  return (
    <Button className={styles.trigger} onClick={onClick}>
      {open ? <CornerUpRight color="white" /> : <IconMenu color="white" />}
    </Button>
  );
}

function Page() {
  return (
    <div className={`fixedPage full ${styles.page}`}>
      {/* <Settings /> */}
      {/* <History /> */}
      <GameRules />
    </div>
  );
}

// ===== Menu =====
export default function Menu({ options }: { options: Option[] }) {
  const [open, trigger] = useTrigger();

  return (
    <>
      <Page />
      <Trigger open={open} onClick={() => trigger()} />
      <Drawer options={options} open={open} />
    </>
  );
}
