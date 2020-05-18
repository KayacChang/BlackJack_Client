import React, { ReactNode, useState, PropsWithChildren } from "react";
import styles from "./Menu.module.scss";
import Drawer from "./components/Drawer";
import { Close, Trigger } from "./components/Button";
import { Settings, Info, Clock, LogOut } from "react-feather";
import { SettingsPage, HistoryPage, GameRulesPage } from "./pages";

// ===== Menu =====
export default function Menu() {
  const [page, setPage] = useState<ReactNode | undefined>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  function openPage(page?: ReactNode | undefined) {
    //
    return function () {
      setDrawerOpen(false);
      setPage(page);
    };
  }

  const options = [
    {
      icon: <Info />,
      title: "rules",
      onClick: openPage(<GameRulesPage />),
    },
    {
      icon: <Settings />,
      title: "settings",
      onClick: openPage(<SettingsPage />),
    },
    {
      icon: <Clock />,
      title: "history",
      onClick: openPage(<HistoryPage />),
    },
    {
      icon: <LogOut />,
      title: "home",
      onClick: () => console.log("home"),
    },
  ];

  function Page({ children }: PropsWithChildren<{}>) {
    return (
      <>
        <div
          className={`fixedPage full ${styles.page}`}
          onClick={() => isDrawerOpen && setDrawerOpen(false)}
        >
          {children}
        </div>
        <Close style={{ left: 0 }} onClick={openPage(undefined)} />
      </>
    );
  }

  return (
    <>
      {page && <Page>{page}</Page>}

      <Trigger
        style={{ right: 0 }}
        open={isDrawerOpen}
        onClick={() => setDrawerOpen(!isDrawerOpen)}
      />
      <Drawer options={options} open={isDrawerOpen} />
    </>
  );
}
