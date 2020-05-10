import React, { PropsWithChildren, HTMLAttributes, useState } from "react";
import { Flex } from "../layouts/Flex";
import {
  Volume2,
  Settings,
  Clock,
  HelpCircle,
  Maximize,
  Home,
  Menu,
} from "react-feather";
import styles from "./UI.module.scss";
import { useSpring, animated } from "react-spring";

function PlaceHolder() {
  return <div style={{ height: 100 + "%", width: 100 + "%" }}></div>;
}

type BarProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

function Bar({ children, ...props }: BarProps) {
  return <Flex {...props}>{children}</Flex>;
}

function Button({ children, ...props }: PropsWithChildren<{}>) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}

function Volume() {
  return (
    <Button>
      <Volume2 color="white" size={16} onClick={() => console.log("volume")} />
    </Button>
  );
}

function Setting() {
  return (
    <Button>
      <Settings
        color="white"
        size={16}
        onClick={() => console.log("setting")}
      />
    </Button>
  );
}

function History() {
  return (
    <Button>
      <Clock color="white" size={16} onClick={() => console.log("history")} />
    </Button>
  );
}

function Rule() {
  return (
    <Button>
      <HelpCircle color="white" size={16} onClick={() => console.log("rule")} />
    </Button>
  );
}

function Leave() {
  return (
    <Button>
      <Home color="white" size={16} onClick={() => console.log("leave")} />
    </Button>
  );
}

function FullScreen() {
  return (
    <Button>
      <Maximize
        color="white"
        size={16}
        onClick={() => console.log("fullscreen")}
      />
    </Button>
  );
}

function MenuButton({ ...props }) {
  return (
    <Button {...props}>
      <Menu color="white" size={16} />
    </Button>
  );
}

type ButtonGroupProps = {
  open: boolean;
};

function ButtonGroup({ open }: ButtonGroupProps) {
  //
  const styles = useSpring({
    pointerEvents: open ? "auto" : "none",
    opacity: open ? 1 : 0,
    transform: `translate(${open ? 0 : "100%"}, 0)`,
    config: { mass: 3, tension: 2000, friction: 100 },
  });

  return (
    <animated.div style={{ display: "flex", ...styles }}>
      <Volume />
      <Setting />
      <History />
      <Rule />
      <FullScreen />
      <Leave />
    </animated.div>
  );
}

function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <Bar style={{ height: 16 + "%", alignItems: "center" }}>
      <PlaceHolder />
      <Flex style={{ padding: 16 + "px" }}>
        <ButtonGroup open={open} />
        <MenuButton style={{ zIndex: "1" }} onClick={() => setOpen(!open)} />
      </Flex>
    </Bar>
  );
}

function BottomBar() {
  return <Bar style={{ height: 3 + "vh" }} />;
}

export default function UI() {
  return (
    <Flex
      style={{
        position: "absolute",
        flexDirection: "column",
        height: 100 + "%",
        width: 100 + "%",
        overflow: "hidden",
      }}
    >
      <TopBar />
      <PlaceHolder />
      <BottomBar />
    </Flex>
  );
}
