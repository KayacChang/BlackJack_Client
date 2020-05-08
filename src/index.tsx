import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/App";
import * as serviceWorker from "./workers/serviceWorker";
import Game from "./game";

function main() {
  //
  ReactDOM.render(
    <React.StrictMode>
      <App>{Game}</App>
    </React.StrictMode>,
    document.getElementById("root")
  );

  serviceWorker.unregister();
}

main();
