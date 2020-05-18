import React, { PropsWithChildren } from "react";
import { Center, Flex } from "../layouts/Flex";
import Canvas from "../components/canvas/Canvas";
import { isMobile } from "../utils";
import { useResize } from "../states";
import Menu from "./menu";
import Status from "./status";

function UI() {
  //
  return (
    <div className="fixedPage">
      <Menu />
      <Status />
    </div>
  );
}

export default function Main({ children }: PropsWithChildren<{}>) {
  const mobile = useResize(isMobile);

  return (
    <Center className="full">
      <Flex style={{ position: "relative" }}>
        <Canvas>{children}</Canvas>
        {!mobile && <UI />}
      </Flex>

      {mobile && <UI />}
    </Center>
  );
}
