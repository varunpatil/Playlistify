import React from "react";
import axios from "axios";
const queryString = require("query-string");

import Router from "./components/Router";
import LoginPage from "./components/LoginPage";

export default function App() {
  let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  if (isLoggedIn) {
    return <Router />;
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
