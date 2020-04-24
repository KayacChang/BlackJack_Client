import React, { PropsWithChildren } from "react";
import { Center } from "../layouts/Flex";
import Canvas from "../components/canvas/Canvas";

export default function Main({ children }: PropsWithChildren<{}>) {
  //
  return (
    <Center style={{ height: 100 + "%", width: 100 + "%" }}>
      <Canvas
        style={{
          maxHeight: 100 + "%",
          maxWidth: 100 + "%"
        }}
      >
        {children}
      </Canvas>
    </Center>
  );
}
