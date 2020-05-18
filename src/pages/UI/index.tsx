import React, { useState, ReactNode } from "react";
import { Flex } from "../../layouts/Flex";
import Menu from "./Menu";
import { Settings, Info, Clock, LogOut } from "react-feather";
import SettingsPage from "./Settings";
import HistoryPage from "./History";
import GameRulesPage from "./GameRules";
import { useTrigger } from "../../states";

export default function UI() {
  //
  const [page, setPage] = useState<ReactNode>();
  const [openDrawer, triggerDrawer] = useTrigger();

  return (
    <Flex className="fixedPage">
      <Menu
        page={page}
        setPage={setPage}
        open={openDrawer}
        trigger={triggerDrawer}
        options={[
          {
            icon: <Info />,
            title: "rules",
            onClick: () => {
              triggerDrawer(false);
              setPage(<GameRulesPage />);
            },
          },
          {
            icon: <Settings />,
            title: "settings",
            onClick: () => {
              triggerDrawer(false);
              setPage(<SettingsPage />);
            },
          },
          {
            icon: <Clock />,
            title: "history",
            onClick: () => {
              triggerDrawer(false);
              setPage(<HistoryPage />);
            },
          },
          {
            icon: <LogOut />,
            title: "home",
            onClick: () => console.log("home"),
          },
        ]}
      />
    </Flex>
  );
}
