import React, { PropsWithChildren, HTMLAttributes } from "react";
import { Flex } from "../layouts/Flex";
import {
  Volume2,
  Settings,
  Clock,
  HelpCircle,
  Maximize,
  Home,
} from "react-feather";
import styles from "./UI.module.scss";

function PlaceHolder() {
  return <div style={{ height: 100 + "%", width: 100 + "%" }}></div>;
}

type BarProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

function Bar({ children, ...props }: BarProps) {
  return <Flex {...props}>{children}</Flex>;
}

function Button({ children }: PropsWithChildren<{}>) {
  return <button className={styles.button}>{children}</button>;
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

function Fullscreen() {
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

function TopBar() {
  return (
    <Bar style={{ height: 16 + "%", alignItems: "center" }}>
      <PlaceHolder />
      <Flex style={{ padding: 16 + "px" }}>
        <Volume />
        <Setting />
        <History />
        <Rule />
        <Fullscreen />
        <Leave />
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
      }}
    >
      <TopBar />
      <PlaceHolder />
      <BottomBar />
    </Flex>
  );
}
