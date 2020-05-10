import React, { PropsWithChildren } from "react";
import { Center, Flex } from "../layouts/Flex";
import Canvas from "../components/canvas/Canvas";
import UI from "./UI";

export default function Main({ children }: PropsWithChildren<{}>) {
  //
  return (
    <Center style={{ height: 100 + "%", width: 100 + "%" }}>
      <Flex style={{ position: "relative" }}>
        <Canvas>{children}</Canvas>

        <UI />
      </Flex>
    </Center>
  );
}
