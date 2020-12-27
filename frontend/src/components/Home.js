import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import TopList from "./TopList";
import NavBar from "./NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/top/artists" render={() => <TopList type="Artist" />} />
          <Route path="/top/tracks" render={() => <TopList type="Track" />} />
        </Switch>
      </Router>
    </div>
  );
}
