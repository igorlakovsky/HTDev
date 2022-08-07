import "antd/dist/antd.css";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import { createRoot } from "react-dom/client";
import store from "./app/store";

const rootElement = document.createElement("div");
rootElement.setAttribute("id", "root");

document.body.appendChild(rootElement);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
