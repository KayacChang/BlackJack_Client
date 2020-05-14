import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App";
import * as serviceWorker from "./workers/serviceWorker";
import Game from "./game";
import { i18n } from "./utils";

const Root = (
  <React.StrictMode>
    <App>{Game}</App>
  </React.StrictMode>
);

async function main() {
  //
  await i18n.init();

  ReactDOM.render(Root, document.getElementById("root"));

  serviceWorker.unregister();
}

main();
