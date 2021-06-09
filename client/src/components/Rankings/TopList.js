import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Tab, Tabs, makeStyles } from "@material-ui/core";

import CreatePlaylistMenu from "../CreatePlaylistMenu";
import Loader from "../Loader";
import TopUnit from "./TopUnit";

function TopList({ type }) {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [timeRange, setTimeRange] = useState("short_term");

  useEffect(() => {
    const getTopList = async () => {
      const res = await axios.get(
        `/api/top/${type.toLowerCase()}s?time_range=` + timeRange
      );
      setItems(res.data);
    };

    getTopList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={timeRange}
          onChange={(e, newTimeRange) => {
            setTimeRange(newTimeRange);
          }}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Last month" value="short_term" />
          <Tab label="Last 6 months" value="medium_term" />
          <Tab label="All Time" value="long_term" />
        </Tabs>
      </Paper>

      {items.length === 0 ? <Loader /> : null}

      {items.map((item, rank) => (
        <TopUnit type={type} key={item.id} rank={rank + 1} unit={item} />
      ))}

      {type === "Track" ? (
        <CreatePlaylistMenu
          timeRange={timeRange}
          type={type}
          trackIds={items.map((item) => item.id)}
          artistIds={items.map((item) => item.artists[0].id)}
        />
      ) : (
        <CreatePlaylistMenu
          timeRange={timeRange}
          type={type}
          artistIds={items.map((item) => item.id)}
        />
      )}
    </div>
  );
}

export function TopTracks() {
  return <TopList type="Track" />;
}

export function TopArtists() {
  return <TopList type="Artist" />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
}));
