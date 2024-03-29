import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";

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
  const [premiumUser, setPremiumUser] = useState(false);
  const [songInfo, setSongInfo] = useState(null);

  // fetch now playing
  const getNowPlaying = async () => {
    const res = await axios.get("/now_playing");
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

  // refresh song info
  useEffect(() => {
    // fetch song info which includes Lyrics, Meaning and Youtube URL
    const getSongInfo = async () => {
      if (!nowPlaying) return;

      if (nowPlaying.track_id !== trackId) {
        console.log("New Track... fetching lyrics etc");
        setTrackId(nowPlaying.track_id);
        setSongInfo(null);
        const res = await axios.get(
          `/lyrics?track_name=${nowPlaying.track_name}&artist_name=${nowPlaying.artist_name}`
        );
        setSongInfo(res.data);
      } else {
        console.log("No new Track... updating progress bar");
      }
    };

    getSongInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPlaying]);

  // get user to check if premium is available
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/me");
      if (res.data.product === "premium") {
        setPremiumUser(true);
      }
    };
    getUser();
  }, []);

  // ----------------------------------------------- //

  if (!nowPlaying) return <NothingPlaying />;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={nowPlaying.image_url}
          title={nowPlaying.track_name}
        />
        <CardContent className={classes.content}>
          <Typography variant="h5">{nowPlaying.track_name}</Typography>

          <Typography
            variant="subtitle1"
            color="textSecondary"
            style={{ paddingTop: "4px", paddingBottom: "4px" }}
          >
            {nowPlaying.artist_name}
          </Typography>

          <Typography variant="subtitle2" color="textSecondary">
            {nowPlaying.album_name}
          </Typography>
        </CardContent>
      </Card>

      <Divider className={classes.divider} />

      {premiumUser ? (
        <Controller playback={nowPlaying.playback} refresh={getNowPlaying} />
      ) : null}

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
