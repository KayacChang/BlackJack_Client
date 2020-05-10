import React, { PropsWithChildren, HTMLAttributes } from "react";
import { Flex } from "../layouts/Flex";

function PlaceHolder() {
  return <div style={{ height: 100 + "%", width: 100 + "%" }}></div>;
}

type BarProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

function Bar({ style, ...props }: BarProps) {
  return <div style={{ background: "#000", ...style }} {...props}></div>;
}

function TopBar() {
  return <Bar style={{ height: 6 + "vh" }} />;
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
