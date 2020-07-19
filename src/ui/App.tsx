import React, { ReactNode, PropsWithChildren, useEffect, useState } from 'react';
import { Center, Flex, Canvas } from './components';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation, Navigate } from 'react-router-dom';
import Lobby from './lobby';
import services from '../service';
import Loading from './loading';
import RES from '../assets';
import { ModalProvider } from './modal';

type Props = {
  game: (canvas: HTMLCanvasElement) => void;
  ui: ReactNode;
};

function Frame({ children, ui }: PropsWithChildren<{ ui: ReactNode }>) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('lobby') || location.pathname.includes('game')) {
      const bg = RES.getSound('BG_MUSIC');

      if (!bg.playing()) {
        bg.loop(true).play();
      }
    }
  }, [location]);

  return (
    <ModalProvider>
      <Center style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <Flex style={{ position: 'relative' }}>
          {children}
          {ui}
        </Flex>
      </Center>
    </ModalProvider>
  );
}

function useJoin() {
  const params = useParams();
  const [hasJoin, setHasJoin] = useState(false);

  useEffect(() => {
    services.joinRoom(Number(params.id)).then(() => setHasJoin(true));
  }, [params]);

  return hasJoin;
}

function Game({ game }: { game: (canvas: HTMLCanvasElement) => void }) {
  const join = useJoin();

  if (join) {
    return <Canvas>{game}</Canvas>;
  }

  return <div>loading...</div>;
}

export default function App({ ui, game }: Props) {
  return (
    <Router>
      <Frame ui={ui}>
        <Routes basename={process.env.PUBLIC_URL}>
          <Route path="/" element={<Loading />} />
          <Route path="lobby" element={<Lobby />} />
          <Route path="game/:id" element={<Game game={game} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Frame>
    </Router>
  );
}
