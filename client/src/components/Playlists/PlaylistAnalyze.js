import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Divider, useTheme } from "@material-ui/core";

import Loader from "../Loader";
import Header from "./PlaylistAnalyze/Header";
import Pie from "./PlaylistAnalyze/Pie";
import Calendar from "./PlaylistAnalyze/Calendar";
import Bar from "./PlaylistAnalyze/Bar";
import Line from "./PlaylistAnalyze/Line";

export default function PlaylistAnalyze(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getPlaylistData = async () => {
      const id = props.match.params.id;
      const res = await axios.get(`/playlist/analyze/${id}`);
      setData(res.data);
    };

    getPlaylistData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data ? (
    <div style={{ maxWidth: "100vw" }}>
      <Header data={data.header} />
      <Pie data={data.artist_frequency} type="Artist" colorScheme="paired" />
      <CustomDivider />
      <Pie data={data.genre_frequency} type="Genre" colorScheme="category10" />
      <CustomDivider />
      <Bar data={data.audio_features} />
      <CustomDivider />
      <Line type={1} data={data.release_years} />
      <CustomDivider />
      <Line type={2} data={data.popularities} />
      <CustomDivider />
      <Line type={3} data={data.durations} />
      <CustomDivider />
      {/* Optional chaining. audio_features is {} when number of trcks is 0*/}
      <Line type={4} data={data.audio_features?.bpms} />
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
