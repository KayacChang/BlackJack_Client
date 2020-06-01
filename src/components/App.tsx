import React, { ReactNode } from 'react';
import { isMobile, useResize } from '../utils';
import { Center, Flex } from './layouts/Flex';
import Canvas from './canvas/Canvas';

type Props = {
  game: (canvas: HTMLCanvasElement) => void;
  ui: ReactNode;
};

export default function App({ game, ui }: Props) {
  //
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
