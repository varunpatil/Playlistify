import React, { Component, component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

import { isLoggedIn, setLoggedInFlag } from "../utils";

const Home = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/top/artists" component={TopArtists} />
        <Route path="/top/tracks" component={TopTracks} />
      </Switch>
    </Router>
  );
};

export const App = () => {
  var checkLogin = isLoggedIn()
  console.log(checkLogin)
  if (checkLogin) {
    return <Home />;
  }
  return <LoginPage />;
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);
