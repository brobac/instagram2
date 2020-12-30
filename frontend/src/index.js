import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Root from "./pages/index";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import "../src/assets/reset.css";
import { AppProvider } from "./store";

ReactDOM.render(
  <AppProvider>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </AppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
