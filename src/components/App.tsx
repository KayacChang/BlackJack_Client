import React, { PropsWithChildren } from "react";
import Main from "../ui/Main";

export default function App({ children }: PropsWithChildren<{}>) {
  //
  return <Main>{children}</Main>;
}
