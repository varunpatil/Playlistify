import React from "react";
import axios from "axios";
const queryString = require("query-string");

import Home from "./Home.js";
import LoginPage from "./LoginPage";
import { isLoggedIn } from "../utils";

export default function App() {
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
}
