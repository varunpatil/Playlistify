import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Divider,
  LinearProgress,
  Typography,
} from "@material-ui/core";

import { FormatAlignLeft, Help, YouTube } from "@material-ui/icons";

import Controller from "./HomePage/Controller";
import DropDown from "./HomePage/DropDown";
import Text from "./HomePage/Text";
import Video from "./HomePage/Video";
import NothingPlaying from "./HomePage/NothingPlaying";

export default function HomePage() {
  const classes = useStyles();
  const [trackId, setTrackId] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [songInfo, setSongInfo] = useState(null);

  // fetch now playing
  const getNowPlaying = async () => {
    const res = await axios.get("/api/now_playing");
    if (res.data.message !== "No track currently playing") {
      setNowPlaying(res.data);
    }
  };

  // refresh now playing
  useEffect(() => {
    const refreshTime = 3000;
    getNowPlaying();

    const refreshNowPlaying = setInterval(() => {
      getNowPlaying();
    }, refreshTime);

    return () => clearInterval(refreshNowPlaying);
  }, []);

  // fetch song info which includes Lyrics, Meaning and Youtube URL
  useEffect(async () => {
    if (!nowPlaying) return;

    if (nowPlaying.track_id !== trackId) {
      console.log("New Track... fetching lyrics etc");
      setTrackId(nowPlaying.track_id);
      setSongInfo(null);
      const res = await axios.get(
        `/api/lyrics?track_name=${nowPlaying.track_name}&artist_name=${nowPlaying.artist_name}`
      );
      setSongInfo(res.data);
    } else {
      console.log("No new Track... updating progress bar");
    }
  }, [nowPlaying]);

  return nowPlaying ? (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          alt={nowPlaying.track_name}
          image={nowPlaying.image_url}
          title={nowPlaying.track_name}
        />
        <CardContent className={classes.content}>
          <Typography variant="h5">{nowPlaying.track_name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {nowPlaying.artist_name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {nowPlaying.album_name}
          </Typography>
        </CardContent>
      </Card>

      <Controller />

      <LinearProgress
        variant="determinate"
        style={{ height: "6px" }}
        value={100 * (nowPlaying.progress_ms / nowPlaying.duration_ms)}
      />

      <br />

      <DropDown
        name="Lyrics"
        icon={FormatAlignLeft}
        component={Text}
        info={songInfo}
      />

      <Divider className={classes.divider} />

      <DropDown name="Meaning" icon={Help} component={Text} info={songInfo} />

      <Divider className={classes.divider} />

      <DropDown
        name="Watch Video"
        icon={YouTube}
        component={Video}
        info={songInfo}
      />
    </div>
  ) : (
    <NothingPlaying />
  );
}

// ------------------- Styles -------------------------- //

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    height: theme.spacing(15),
  },
  content: {
    flexDirection: "column",
    flex: "1 0 auto",
  },
  cover: {
    minWidth: theme.spacing(15),
  },
  divider: {
    background: theme.palette.background.divider,
  },
  root: {
    marginBottom: theme.spacing(3),
  },
}));
