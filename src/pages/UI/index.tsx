import React from "react";
import { Flex } from "../../layouts/Flex";
import Menu from "./Menu";
import { Settings, Info, Clock, LogOut } from "react-feather";

export default function UI() {
  //
  return (
    <Flex
      className="fixedPage"
      style={{
        flexDirection: "row-reverse",
      }}
    >
      <Menu
        options={[
          {
            icon: <Info color="white" />,
            title: "game rules",
            onClick: () => console.log("game rules"),
          },
          {
            icon: <Settings color="white" />,
            title: "settings",
            onClick: () => console.log("settings"),
          },
          {
            icon: <Clock color="white" />,
            title: "history",
            onClick: () => console.log("history"),
          },
          {
            icon: <LogOut color="white" />,
            title: "home",
            onClick: () => console.log("home"),
          },
        ]}
      />
    </Flex>
  );
}
