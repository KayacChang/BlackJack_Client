import React, { ReactNode, MouseEvent } from "react";
import styles from "./Drawer.module.scss";
import { useSpring, animated } from "react-spring";
import { easeCubic } from "d3-ease";
import { Option as OptionButton } from "./Button";

type Option = {
  icon: ReactNode;
  title: string;
  onClick: (event: MouseEvent) => void;
};

type DrawerProps = DivProps<{
  options: Option[];
  open: boolean;
}>;

function Logo() {
  return <div className={styles.logo}></div>;
}

export default function Drawer({ open, options }: DrawerProps) {
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
