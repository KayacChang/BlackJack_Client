import React, { PropsWithChildren } from "react";
import Main from "../pages/Main";

export default function App({ children }: PropsWithChildren<{}>) {
  //
  return <Main>{children}</Main>;
}
