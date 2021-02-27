import React, { useState, useEffect } from "react";
import axios from "axios";
import { Divider, useTheme } from "@material-ui/core";

import Loader from "./Loader";
import Header from "./PlaylistAnalyze/Header";
import PieChart from "./PlaylistAnalyze/PieChart";

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
      <PieChart
        data={data.artist_frequency}
        type="Artist"
        colorScheme="paired"
      />
      <CustomDivider />
      <PieChart
        data={data.genre_frequency}
        type="Genre"
        colorScheme="category10"
      />
      <CustomDivider />
    </div>
  ) : (
    <Loader />
  );
}

const CustomDivider = () => {
  const theme = useTheme();
  return (
    <div>
      <br /> <br />
      <Divider style={{ background: theme.palette.background.divider }} />
    </div>
  );
};
