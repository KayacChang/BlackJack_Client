import React, { useState, ReactNode } from "react";
import { Flex } from "../../layouts/Flex";
import Menu from "./Menu";
import { Settings, Info, Clock, LogOut } from "react-feather";
import SettingsPage from "./Settings";
import HistoryPage from "./History";
import GameRulesPage from "./GameRules";

export default function UI() {
  //
  const [page, setPage] = useState<ReactNode>();

  return (
    <Flex className="fixedPage">
      <Menu
        page={page}
        options={[
          {
            icon: <Info color={"white"} />,
            title: "rules",
            onClick: () => setPage(<GameRulesPage />),
          },
          {
            icon: <Settings color={"white"} />,
            title: "settings",
            onClick: () => setPage(<SettingsPage />),
          },
          {
            icon: <Clock color={"white"} />,
            title: "history",
            onClick: () => setPage(<HistoryPage />),
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
