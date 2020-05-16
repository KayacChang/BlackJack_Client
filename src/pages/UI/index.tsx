import React, { useState, ReactNode } from "react";
import { Flex } from "../../layouts/Flex";
import Menu from "./Menu";
import { Play, Settings, Info, Clock, LogOut } from "react-feather";
import SettingsPage from "./Settings";
import HistoryPage from "./History";
import GameRulesPage from "./GameRules";

type Option = "game" | "rules" | "settings" | "history" | "home";

export default function UI() {
  //
  const [key, setKey] = useState<Option>("game");

  const page = {
    game: undefined,
    rules: <GameRulesPage />,
    settings: <SettingsPage />,
    history: <HistoryPage />,
    home: undefined,
  }[key];

  return (
    <Flex className="fixedPage">
      <Menu
        page={page}
        options={[
          {
            active: key === "game",
            icon: <Play color={key === "game" ? "#3071a9" : "white"} />,
            title: "game",
            onClick: () => setKey("game"),
          },
          {
            active: key === "rules",
            icon: <Info color={key === "rules" ? "#3071a9" : "white"} />,
            title: "rules",
            onClick: () => setKey("rules"),
          },
          {
            active: key === "settings",
            icon: <Settings color={key === "settings" ? "#3071a9" : "white"} />,
            title: "settings",
            onClick: () => setKey("settings"),
          },
          {
            active: key === "history",
            icon: <Clock color={key === "history" ? "#3071a9" : "white"} />,
            title: "history",
            onClick: () => setKey("history"),
          },
          {
            active: key === "home",
            icon: <LogOut color="white" />,
            title: "home",
            onClick: () => console.log("home"),
          },
        ]}
      />
    </Flex>
  );
}
