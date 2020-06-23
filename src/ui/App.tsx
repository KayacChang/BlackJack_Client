import React, { ReactNode } from 'react';
import { isMobile } from '../utils';
import { useResize } from './hooks';
import { Center, Flex, Canvas } from './components';

type Props = {
  game: (canvas: HTMLCanvasElement) => void;
  ui: ReactNode;
};

export default function App({ game, ui }: Props) {
  const mobile = useResize(isMobile);

  return (
    <Center style={{ width: '100%', height: '100%' }}>
      <Flex style={{ position: 'relative' }}>
        <Canvas>{game}</Canvas>
        {!mobile && ui}
      </Flex>

      {mobile && ui}
    </Center>
  );
}
