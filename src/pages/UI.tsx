import React, { useState } from "react";
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
import { useSpring, animated } from "react-spring";
import { Button } from "../components/button/Button";

function PlaceHolder() {
  return <div style={{ height: 100 + "%", width: 100 + "%" }}></div>;
}

type ButtonGroupProps = {
  open: boolean;
};

function ButtonGroup({ open }: ButtonGroupProps) {
  //
  const styles = useSpring({
    pointerEvents: open ? "auto" : "none",
    opacity: open ? 1 : 0,
    transform: `translate(${open ? "0" : "100%"}, 0)`,
    config: { mass: 3, tension: 2000, friction: 100 },
  });

  const children = [
    <Volume2 color="white" size={16} />,
    <Settings color="white" size={16} />,
    <Clock color="white" size={16} />,
    <HelpCircle color="white" size={16} />,
    <Home color="white" size={16} />,
    <Maximize color="white" size={16} />,
  ];

  return (
    <animated.div style={{ display: "flex", ...styles }}>
      {React.Children.map(children, (child) => (
        <Button>{child}</Button>
      ))}
    </animated.div>
  );
}

function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <Flex style={{ height: 16 + "%", alignItems: "center" }}>
      <PlaceHolder />
      <Flex style={{ padding: 16 + "px" }}>
        <ButtonGroup open={open} />

        <Button style={{ zIndex: 1 }} onClick={() => setOpen(!open)}>
          <Menu color="white" size={16} />
        </Button>
      </Flex>
    </Flex>
  );
}

function BottomBar() {
  return <Flex style={{ height: 3 + "vh" }} />;
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
