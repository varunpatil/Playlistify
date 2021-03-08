import React, { useState, useEffect } from "react";
import axios from "axios";
import { Divider, useTheme } from "@material-ui/core";

import Loader from "./Loader";
import Header from "./PlaylistAnalyze/Header";
import PieChart from "./PlaylistAnalyze/PieChart";
import Calendar from "./PlaylistAnalyze/Calendar";
import Bar from "./PlaylistAnalyze/Bar";
import Line from "./PlaylistAnalyze/Line";

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
      <Bar data={data.audio_features} />
      <CustomDivider />
      <Line type={1} data={data.release_years} />
      <CustomDivider />
      <Line type={2} data={data.popularities} />
      <CustomDivider />
      <Line type={3} data={data.durations} />
      <CustomDivider />
      <Line type={4} data={data.audio_features.bpms} />
      <CustomDivider />
      <Calendar data={data.added_at_dates} />
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
