import React from "react";
import App from "./components/App";
import data from "./data";

React.render(<App {...data} />, document.querySelector("#app"));
