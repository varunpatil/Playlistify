import React from "react";
import { Switch, Route } from "react-router-dom";

import Boilerplate from "./Boilerplate";
import HomePage from "./HomePage";
import { TopTracks, TopArtists } from "./TopList";
import Playlists from "./Playlists";
import PlaylistAnalyze from "./PlaylistAnalyze";
import RecMood from "./RecMood";
import RecFriend from "./RecFriend";
import About from "./About";

export default function Home() {
  return (
    <Boilerplate>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/top/tracks" component={TopTracks} />
        <Route path="/top/artists" component={TopArtists} />
        <Route path="/playlists" component={Playlists} />
        <Route path="/playlist/analyze/:id" component={PlaylistAnalyze} />
        <Route path="/recommendation/friend" component={RecFriend} />
        <Route path="/recommendation/mood" component={RecMood} />
        <Route path="/about" component={About} />
      </Switch>
    </Boilerplate>
  );
}
