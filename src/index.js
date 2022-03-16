import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";

window["react"] = React;
window["react-dom"] = ReactDOM;

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
