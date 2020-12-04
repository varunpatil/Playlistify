import React from "react";
const queryString = require("query-string");

const TopTracks = (props) => {
  var queryParams = queryString.parse(props.location.search);
  return <h1>This is top tracks. time range is {queryParams["time_range"]}</h1>;
};

export default TopTracks;
