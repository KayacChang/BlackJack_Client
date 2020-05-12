import React, { PropsWithChildren } from "react";
import { Center, Flex } from "../layouts/Flex";
import Canvas from "../components/canvas/Canvas";
import UI from "./UI";

export default function Main({ children }: PropsWithChildren<{}>) {
  //
  return (
    <Center className="full">
      <Flex style={{ position: "relative" }}>
        <Canvas>{children}</Canvas>
      </Flex>
      <UI />
    </Center>
  );
}
