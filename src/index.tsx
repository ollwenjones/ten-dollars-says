import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Modal from "react-modal";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { ApiConfig } from "./rest-api/ApiConfig";

const rootElement = document.getElementById("root") as HTMLElement;

// load root rest path configuration:
ApiConfig.loadConfig();

Modal.setAppElement(rootElement);

ReactDOM.render(<App />, rootElement);

registerServiceWorker();
