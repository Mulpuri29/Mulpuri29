import React from "react";
import { render } from "react-dom";
import { App } from "./app";
import { Spinner } from "./common/components/spinner";
import "./css/site.scss";

render(
  <div>
    <App />
    <Spinner />
  </div>,
  document.getElementById("root")
);
