import React, { useState, useEffect } from "react";
import axios from "axios";
import { TopTracksList } from "./TopList";
const queryString = require("query-string");

export default function TopTracks(props) {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    let time_range = queryString.parse(props.location.search)["time_range"];
    getTopTracks(time_range);
  }, []);

  const getTopTracks = async (time_range) => {
    const res = await axios.get("/api/top/tracks?time_range=" + time_range);
    setTopTracks(res.data);
    console.log(res.data);
  };

  return (
    <div>
      <h1>TOP TRACKS</h1>
      <TopTracksList list={topTracks} />
    </div>
  );
}
