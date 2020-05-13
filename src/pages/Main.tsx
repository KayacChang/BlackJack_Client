import React, { PropsWithChildren } from "react";
import { Center, Flex } from "../layouts/Flex";
import Canvas from "../components/canvas/Canvas";
import UI from "./UI";
import { isMobile } from "../utils";
import { useResize } from "../states";

export default function Main({ children }: PropsWithChildren<{}>) {
  //
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
