import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Tab, Tabs, makeStyles } from "@material-ui/core";

import CreatePlaylistMenu from "./CreatePlaylistMenu";
import Loader from "./Loader";
import Artist from "./Artist";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
}));

export default function TopArtists() {
  const classes = useStyles();
  const [artists, setArtists] = useState([]);
  const [timeRange, setTimeRange] = useState("short_term");

  const changeTimeRange = (event, newTimeRange) => {
    setTimeRange(newTimeRange);
  };

  useEffect(async () => {
    // setArtists(null);
    const res = await axios.get("/api/top/artists?time_range=" + timeRange);
    setArtists(res.data);
  }, [timeRange]);

  let content = <Loader />;
  if (artists.length) {
    content = artists.map((artist, key) => (
      <Artist key={key} artist={artist} />
    ));
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
        type="Artist"
        artistIds={artists.map((artist) => artist.id)}
      />
    </div>
  );
}
