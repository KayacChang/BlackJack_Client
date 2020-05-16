import React, { ReactNode, MouseEvent, PropsWithChildren } from "react";
import { Menu as IconMenu, CornerUpRight } from "react-feather";
import { Button } from "../../components/button/Button";
import { useTrigger } from "../../states";
import styles from "./Menu.module.scss";
import { useSpring, animated } from "react-spring";
import { easeCubic } from "d3-ease";

// ===== Drawer =====

type Option = {
  icon: ReactNode;
  title: string;
  active: boolean;
  onClick: (event: MouseEvent) => void;
};

function OptionButton({
  active,
  children,
  onClick,
}: ButtonProps<{ active: boolean }>) {
  //
  const _className = [styles.option, active && styles.active]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={_className} onClick={onClick}>
      {children}
    </button>
  );
}

function Logo() {
  return <div className={styles.logo}></div>;
}

type DrawerProps = DivProps<{
  options: Option[];
  open: boolean;
}>;

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

      {options.map(({ icon, title, onClick, active }) => (
        <OptionButton key={title} onClick={onClick} active={active}>
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

function Trigger({ open, style, onClick }: TriggerProps) {
  return (
    <Button className={styles.trigger} onClick={onClick} style={style}>
      {open ? <CornerUpRight color="white" /> : <IconMenu color="white" />}
    </Button>
  );
}

function Page({ children }: PropsWithChildren<{}>) {
  return <div className={`fixedPage full ${styles.page}`}>{children}</div>;
}

// ===== Menu =====
type MenuProps = {
  page?: ReactNode;
  options: Option[];
};
export default function Menu({ page, options }: MenuProps) {
  const [open, trigger] = useTrigger();

  return (
    <>
      {page && <Page>{page}</Page>}
      <Trigger style={{ right: 0 }} open={open} onClick={() => trigger()} />
      <Drawer options={options} open={open} />
    </>
  );
}
