import React, { ReactNode, MouseEvent } from 'react';
import styles from './Drawer.module.scss';
import { useSpring, animated } from 'react-spring';
import { easeCubic } from 'd3-ease';
import { Option as OptionButton } from './Button';

type Option = {
  icon: ReactNode;
  title: string;
  onClick: (event: MouseEvent) => void;
};

type DrawerProps = DivProps<{
  options: Option[];
  open: boolean;
}>;

function Placeholder() {
  return <div className={styles.placeholder}></div>;
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
      <Placeholder />

      {options.map(({ icon, title, onClick }) => (
        <OptionButton open={open} key={title} onClick={onClick}>
          {icon}
        </OptionButton>
      ))}
    </animated.div>
  );
}
