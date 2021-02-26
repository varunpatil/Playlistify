import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import Header from "./PlaylistAnalyze/Header";
import ArtistPieChart from "./PlaylistAnalyze/ArtistPieChart";

export default function PlaylistAnalyze(props) {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const id = props.match.params.id;
    const res = await axios.get(`/api/playlist/analyze/${id}`);
    setData(res.data);
  }, []);

  return data ? (
    <div style={{ maxWidth: "100vw" }}>
      <Header data={data.header} />
      <ArtistPieChart data={data.artist_frequency} />
      <br /> <br/>
      <ArtistPieChart data={data.artist_frequency} />
    </div>
  ) : (
    <Loader />
  );
}
