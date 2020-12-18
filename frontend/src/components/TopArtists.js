import React from "react";
const queryString = require("query-string");

export default function TopArtists(props) {
  var queryParams = queryString.parse(props.location.search);
  return (
    <h1>This is top artists. time range is {queryParams["time_range"]}</h1>
  );
}
