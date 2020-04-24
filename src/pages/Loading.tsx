import React from "react";
import Logo from "../components/logo/Logo";
import { Center } from "../layouts/Flex";

export default function Loading() {
  //
  return (
    <Center style={{ height: 100 + "%", width: 100 + "%" }}>
      <Logo style={{ height: 24 + "vh" }} />
    </Center>
  );
}
