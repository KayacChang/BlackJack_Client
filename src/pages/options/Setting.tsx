import React, { PropsWithChildren, HTMLAttributes } from "react";
import { Flex } from "../../layouts/Flex";

type Props = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export default function Setting({ ...props }: Props) {
  return (
    <Flex {...props}>
      <Flex>
        <h1>Setting</h1>
      </Flex>
    </Flex>
  );
}
