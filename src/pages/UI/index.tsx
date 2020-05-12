import React from "react";
import { Flex } from "../../layouts/Flex";
import Menu from "./Menu";

export default function UI() {
  return (
    <Flex
      className="fixedPage"
      style={{
        flexDirection: "row-reverse",
      }}
    >
      <Menu />
    </Flex>
  );
}
