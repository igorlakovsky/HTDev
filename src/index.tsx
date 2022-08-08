import "antd/dist/antd.css";

import * as React from "react";

import App from "./App";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import store from "./app/store";

const rootElement = document.createElement("div");
rootElement.setAttribute("id", "root");

let helloWorld = "Hello World";
document.body.appendChild(rootElement);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
