import React, { ReactNode } from 'react';
import { isMobile } from '../utils';
import { useResize } from './hooks';
import { Center, Flex } from './components/layouts/Flex';
import Canvas from './components/canvas/Canvas';

type Props = {
  game: (canvas: HTMLCanvasElement) => void;
  ui: ReactNode;
};

export default function App({ game, ui }: Props) {
  const mobile = useResize(isMobile);

  return (
    <Center className="full">
      <Flex style={{ position: 'relative' }}>
        <Canvas>{game}</Canvas>
        {!mobile && ui}
      </Flex>

      {mobile && ui}
    </Center>
  );
}
