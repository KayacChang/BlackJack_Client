import React, { PropsWithChildren } from 'react';
import { Center, Flex } from '../layouts/Flex';
import Canvas from '../components/canvas/Canvas';
import { isMobile } from '../utils';
import { useResize } from '../states';
import Menu from './menu';
import Status from './status';
import Detail from './detail';
import Bet from './bet';
import Decision from './decision';

function UI() {
  //
  return (
    <div className="fixedPage">
      <Menu />
      <Status />
      <Detail />
      {/* <Bet /> */}
      {/* <Decision /> */}
    </div>
  );
}

export default function Main({ children }: PropsWithChildren<{}>) {
  const mobile = useResize(isMobile);

  return (
    <Center className="full">
      <Flex style={{ position: 'relative' }}>
        <Canvas>{children}</Canvas>
        {!mobile && <UI />}
      </Flex>

      {mobile && <UI />}
    </Center>
  );
}
