import React from "react";
import { Switch, Route } from "react-router-dom";

import Boilerplate from "./Boilerplate";
import HomePage from "./HomePage";
import { TopTracks, TopArtists } from "./Rankings/TopList";
import Playlists from "./Playlists";
import PlaylistAnalyze from "./Playlists/PlaylistAnalyze";
import Mood from "./Recommendations/Mood";
import Friend from "./Recommendations/Friend";
import RecentlyPlayed from "./RecentlyPlayed";
import Survey from "./Survey";
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
        <Route path="/recommendation/friend" component={Friend} />
        <Route path="/recommendation/mood" component={Mood} />
        <Route path="/recently_played" component={RecentlyPlayed} />
        <Route path="/survey" component={Survey} />
        <Route path="/about" component={About} />
      </Switch>
    </Boilerplate>
  );
}
