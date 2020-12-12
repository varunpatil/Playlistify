import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import Me from "./Me";
import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import NavBar from "./NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/me" component={Me} />
          <Route path="/top/artists" component={TopArtists} />
          <Route path="/top/tracks" component={TopTracks} />
        </Switch>
      </Router>
    </div>
  );
}
