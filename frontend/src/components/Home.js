import React from "react";
import { Switch, Route } from "react-router-dom";

import Boilerplate from "./Boilerplate";
import HomePage from "./HomePage";
import TopTracks from "./TopTracks";
import TopArtists from "./TopArtists";

export default function Home() {
  return (
    <Boilerplate>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/top/tracks" component={TopTracks} />
        <Route path="/top/artists" component={TopArtists} />
      </Switch>
    </Boilerplate>
  );
}
