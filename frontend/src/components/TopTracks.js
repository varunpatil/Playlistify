import React, { useState, useEffect } from "react";
import axios from "axios";
const queryString = require("query-string");

const TopTracks = (props) => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    let time_range = queryString.parse(props.location.search)["time_range"];
    getTopTracks(time_range);
  }, []);

  const getTopTracks = async (time_range) => {
    const res = await axios.get("/api/top/tracks?time_range=" + time_range);
    setTopTracks(res.data.slice(0, 50));
  };

  return (
    <div>
      <h1>TOP TRACKS</h1>
      <TopList list={topTracks} />
    </div>
  );
};

export default TopTracks;

const TopList = ({ list }) => {
  return list.map((elem) => {
    return <TopListElem elem={elem} />;
  });
};

const TopListElem = ({ elem }) => {
  return <div>{elem.name}</div>;
};
