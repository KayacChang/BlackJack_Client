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

function Frame({ children }: PropsWithChildren<{}>) {
  return <Center style={{ width: '100%', height: '100%' }}>{children}</Center>;
}

function Game({ game, ui }: Props) {
  const mobile = useResize(isMobile);

  return (
    <>
      <Flex style={{ position: 'relative' }}>
        <Canvas>{game}</Canvas>
        {!mobile && ui}
      </Flex>
      {mobile && ui}
    </>
  );
}

export default function App({ ui, game }: Props) {
  return (
    <Frame>
      <Router>
        <Routes>
          <Route path="/" element={<Game game={game} ui={ui} />} />
          <Route path="lobby" element={<Lobby />} />
        </Routes>
      </Router>
    </Frame>
  );
}
