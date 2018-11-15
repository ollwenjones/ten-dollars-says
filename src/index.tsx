import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Modal from "react-modal";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

const rootElement = document.getElementById("root") as HTMLElement;

Modal.setAppElement(rootElement);

ReactDOM.render(<App />, rootElement);

registerServiceWorker();
