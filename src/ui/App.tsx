import React, { ReactNode, PropsWithChildren, useEffect, useState } from 'react';
import { Center, Flex, Canvas } from './components';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Lobby from './lobby';
import services from '../service';
import Loading from './loading';
import { ModalProvider } from './modal';
import { SoundProvider } from '../sound';

type Props = {
  game: (canvas: HTMLCanvasElement) => void;
  ui: ReactNode;
};

function Frame({ children, ui }: PropsWithChildren<{ ui: ReactNode }>) {
  return (
    <Center style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Flex style={{ position: 'relative' }}>
        {children}
        {ui}
      </Flex>
    </Center>
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

  return <></>;
}

export default function App({ ui, game }: Props) {
  return (
    <ModalProvider>
      <SoundProvider>
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
      </SoundProvider>
    </ModalProvider>
  );
}
