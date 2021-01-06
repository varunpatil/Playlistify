import React, { useEffect, useState } from "react";
import axios from "axios";
import Iframe from "react-iframe";

import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";

import {
  FormatAlignLeft,
  ExpandLess,
  ExpandMore,
  YouTube,
  Help,
} from "@material-ui/icons";

import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
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
  progress: {
    height: "6px",
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HomePage() {
  const classes = useStyles();
  const [trackId, setTrackId] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const refreshTime = 3000;
    getNowPlaying();
    const refreshNowPlaying = setInterval(() => {
      getNowPlaying();
    }, refreshTime);

    return () => clearInterval(refreshNowPlaying);
  }, []);

  useEffect(async () => {
    if (!nowPlaying) return;

    if (nowPlaying.item.id !== trackId) {
      console.log("new track");
      setTrackId(nowPlaying.item.id);
      setSongInfo(null);
      const res = await axios.get(
        `/api/lyrics?track_name=${nowPlaying.item.name}&artist_name=${nowPlaying.item.artists[0].name}`
      );
      if (res.data.found) {
        setSongInfo(res.data);
      }
    } else {
      console.log("updating");
    }
  }, [nowPlaying]);

  const getNowPlaying = async () => {
    const res = await axios.get("/api/now_playing");
    if (res.data.currently_playing_type === "track") {
      setNowPlaying(res.data);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          alt={nowPlaying ? nowPlaying.item.name : ""}
          image={nowPlaying ? nowPlaying.item.album.images[1].url : ""}
          title={nowPlaying ? nowPlaying.item.name : ""}
        />
        <CardContent className={classes.content}>
          <Typography variant="h5">
            {nowPlaying ? nowPlaying.item.name : "Loading"}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {nowPlaying ? nowPlaying.item.artists[0].name : "Loading"}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {nowPlaying ? nowPlaying.item.album.name : "Loading"}
          </Typography>
        </CardContent>
      </Card>
      <LinearProgress
        variant="determinate"
        className={classes.progress}
        value={
          nowPlaying
            ? 100 * (nowPlaying.progress_ms / nowPlaying.item.duration_ms)
            : 0
        }
      />
      <br />
      <DropDown
        name="Lyrics"
        icon={FormatAlignLeft}
        component={Lyrics}
        info={songInfo}
      />
      <DropDown
        name="Meaning"
        icon={Help}
        component={Meaning}
        info={songInfo}
      />
      <DropDown
        name="Watch Video"
        icon={YouTube}
        component={Video}
        info={songInfo}
      />
    </div>
  );
}

function DropDown(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <List className={classes.list}>
      <ListItem
        button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
        <ListItemText primary={props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <props.component {...props} />
      </Collapse>
    </List>
  );
}

function Lyrics(props) {
  let lyrics = <Loader />;
  if (props.info) {
    lyrics = <div>{props.info.lyrics}</div>;
  }
  return lyrics;
}

function Meaning(props) {
  let meaning = <Loader />;
  if (props.info) {
    meaning = <div>{props.info.meaning}</div>;
  }
  return meaning;
}

function Video(props) {
  let video = <Loader />;
  if (props.info) {
    video = (
      <Iframe
        url={props.info.youtube_embed_url}
        width="450px"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    );
  }
  return video;
}
