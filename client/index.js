import React from "react";
import ReactDOM from "react-dom/client";
import { App as AntdApp } from "antd";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AntdApp>
        <App />
      </AntdApp>
    </BrowserRouter>
  </React.StrictMode>
);
