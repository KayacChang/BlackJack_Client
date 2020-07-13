import React, { ReactNode, PropsWithChildren } from 'react';
import { isMobile } from '../utils';
import { useResize } from './hooks';
import { Center, Flex, Canvas } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lobby from './lobby';

type Props = {
  game: (canvas: HTMLCanvasElement) => void;
  ui: ReactNode;
};

function Frame({ ui, children }: PropsWithChildren<{ ui: ReactNode }>) {
  const mobile = useResize(isMobile);

  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <Flex style={{ position: 'relative' }}>
        {children}
        {!mobile && ui}
      </Flex>

      {mobile && ui}
    </Center>
  );
}

function Game({ game }: { game: (canvas: HTMLCanvasElement) => void }) {
  return <Canvas>{game}</Canvas>;
}

export default function App({ ui, game }: Props) {
  return (
    <Frame ui={ui}>
      <Router>
        <Routes>
          <Route path="/" element={<Game game={game} />} />
          <Route path="lobby" element={<Lobby />} />
        </Routes>
      </Router>
    </Frame>
  );
}
