import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";

import Loader from "./Loader";
import Track from "./Track";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
}));

export default function TopTracks(props) {
  const classes = useStyles();
  const [tracks, setTracks] = useState(null);
  const [timeRange, setTimeRange] = useState("short_term");

  const changeTimeRange = (event, newTimeRange) => {
    setTimeRange(newTimeRange);
  };

  useEffect(async () => {
    const res = await axios.get("/api/top/tracks?time_range=" + timeRange);
    setTracks(res.data);
  }, [timeRange]);

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
          <Tab label="1 month" value="short_term" />
          <Tab label="6 months" value="medium_term" />
          <Tab label="All Time" value="long_term" />
        </Tabs>
      </Paper>

      {tracks ? (
        tracks.map((track, key) => <Track key={key} track={track} />)
      ) : (
        <Loader />
      )}
    </div>
  );
}
