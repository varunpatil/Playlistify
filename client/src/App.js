import React from "react";
import axios from "./axiosConfig";

import Router from "./components/Router";
import LoginPage from "./components/LoginPage";
import { CircularProgress } from "@material-ui/core";

export default function App() {
  let showLoader = false;
  let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  if (isLoggedIn) {
    return <Router />;
  }

  const queryParams = parseUrl(window.location.search);
  if (window.location.pathname === "/login" && "code" in queryParams) {
    showLoader = true;
    axios.post("/login", { code: queryParams["code"] }).then((res) => {
      if (res.data.message === "Success") {
        localStorage.setItem("isLoggedIn", true);
        window.location.replace("/");
      }
    });
  }
  return showLoader ? <CircularLoader /> : <LoginPage />;
}

const parseUrl = (s) => {
  if (s === "") return {};

  const params = {};

  s.substring(1)
    .split("&")
    .forEach((x) => {
      params[x.split("=")[0]] = x.split("=")[1];
    });

  return params;
};

const CircularLoader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress style={{ width: "15vw", height: "15vw" }} />;
    </div>
  );
};
