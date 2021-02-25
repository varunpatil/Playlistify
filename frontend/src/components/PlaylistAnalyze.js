import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import Header from "./Analyze/Header";

export default function PlaylistAnalyze(props) {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const id = props.match.params.id;
    const res = await axios.get(`/api/playlist/analyze/${id}`);
    console.log(res.data);
    setData(res.data);
  }, []);

  return data ? (
    <div>
      <Header data={data} />
    </div>
  ) : (
    <Loader />
  );
}
