import React, { ReactNode, MouseEvent } from "react";
import { Menu as IconMenu, CornerUpRight, X } from "react-feather";
import { Button } from "../../components/button/Button";
import styles from "./Menu.module.scss";
import { useSpring, animated } from "react-spring";
import { easeCubic } from "d3-ease";

// ===== Drawer =====

type Option = {
  icon: ReactNode;
  title: string;
  onClick: (event: MouseEvent) => void;
};

function OptionButton({ children, onClick }: ButtonProps<{}>) {
  //
  const _className = [styles.option].filter(Boolean).join(" ");

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

function Trigger({ open, style, onClick }: TriggerProps) {
  return (
    <Button className={styles.trigger} onClick={onClick} style={style}>
      {open ? <CornerUpRight /> : <IconMenu />}
    </Button>
  );
}

function Close({ style, onClick }: ButtonProps<{}>) {
  return (
    <Button className={styles.trigger} onClick={onClick} style={style}>
      <X />
    </Button>
  );
}

// ===== Menu =====
type MenuProps = {
  page?: ReactNode;
  options: Option[];
  open: boolean;
  trigger: (flag?: boolean | undefined) => void;
  setPage: (page?: ReactNode | undefined) => void;
};
export default function Menu({
  page,
  setPage,
  options,
  open,
  trigger,
}: MenuProps) {
  return (
    <>
      {page && (
        <>
          <div
            className={`fixedPage full ${styles.page}`}
            onClick={() => open && trigger()}
          >
            {page}
          </div>
          <Close
            style={{ left: 0 }}
            onClick={() => {
              trigger(false);
              setPage();
            }}
          />
        </>
      )}
      <Trigger style={{ right: 0 }} open={open} onClick={() => trigger()} />
      <Drawer options={options} open={open} />
    </>
  );
}
