import React from "react";
import { render } from "react-dom";

import axios from "axios";
const queryString = require("query-string");

import Home from "./Home.js";
import LoginPage from "./LoginPage";
import { isLoggedIn } from "../utils";

export const App = () => {
  if (isLoggedIn()) {
    return <Home />;
  }

  let queryParams = queryString.parse(location.search);
  if (location.pathname == "/login" && "code" in queryParams) {
    axios.post("/api/login", { code: queryParams["code"] }).then((res) => {
      if (res.data.message === "Success") {
        localStorage.setItem("isLoggedIn", true);
        location.replace("/");
      }
    });
  }
  return <LoginPage />;
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);
