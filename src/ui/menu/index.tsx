import React, { ReactNode, useState } from 'react';
import styles from './Menu.module.scss';
import Drawer from './components/Drawer';
import { Trigger } from './components/Button';
import { Settings, Info, Clock, LogOut } from 'react-feather';
import { SettingsPage, HistoryPage, GameRulesPage } from './pages';

// ===== Menu =====
export default function Menu() {
  const [page, setPage] = useState<ReactNode | undefined>();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const options = [
    {
      icon: <Info />,
      title: 'rules',
      onClick: () => setPage(<GameRulesPage />),
    },
    {
      icon: <Settings />,
      title: 'settings',
      onClick: () => setPage(<SettingsPage />),
    },
    {
      icon: <Clock />,
      title: 'history',
      onClick: () => setPage(<HistoryPage />),
    },
    {
      icon: <LogOut />,
      title: 'home',
      onClick: () => console.log('home'),
    },
  ];

  const _className = [styles.page, page || styles.hidden].filter(Boolean).join(' ');

  function onTrigger() {
    setDrawerOpen(!isDrawerOpen);
    setPage(undefined);
  }

  return (
    <>
      <Trigger style={{ right: 0 }} open={isDrawerOpen} onClick={onTrigger} />

      <div className={styles.menu}>
        <div className={_className}>{page}</div>
        <Drawer options={options} open={isDrawerOpen} />
      </div>
    </>
  );
}
