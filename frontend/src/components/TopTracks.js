import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Tab, Tabs, makeStyles } from "@material-ui/core";

import CreatePlaylistMenu from "./CreatePlaylistMenu";
import Loader from "./Loader";
import Track from "./Track";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
}));

export default function TopTracks() {
  const classes = useStyles();
  const [tracks, setTracks] = useState([]);
  const [timeRange, setTimeRange] = useState("short_term");

  const changeTimeRange = (event, newTimeRange) => {
    setTimeRange(newTimeRange);
  };

  useEffect(async () => {
    // setTracks(null);
    const res = await axios.get("/api/top/tracks?time_range=" + timeRange);
    setTracks(res.data);
  }, [timeRange]);

  let content = <Loader />;
  if (tracks.length) {
    content = tracks.map((track, key) => <Track key={key} track={track} />);
  }

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={timeRange}
          onChange={changeTimeRange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Last month" value="short_term" />
          <Tab label="Last 6 months" value="medium_term" />
          <Tab label="All Time" value="long_term" />
        </Tabs>
      </Paper>

      {content}

      <CreatePlaylistMenu
        timeRange={timeRange}
        type="Track"
        ids={tracks.map((track) => track.id)}
      />
    </div>
  );
}
