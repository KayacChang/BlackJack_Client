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

function Frame({ children, ui }: PropsWithChildren<{ ui: ReactNode }>) {
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

function Game({ game }: Props) {
  return <Canvas>{game}</Canvas>;
}

export default function App({ ui, game }: Props) {
  return (
    <Router>
      <Frame ui={ui}>
        <Routes>
          <Route path="/" element={<Game game={game} ui={ui} />} />
          <Route path="lobby" element={<Lobby />} />
        </Routes>
      </Frame>
    </Router>
  );
}
