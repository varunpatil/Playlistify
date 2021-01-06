import React, { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    const refreshTime = 3000;
    getNowPlaying();
    const refreshNowPlaying = setInterval(() => {
      getNowPlaying();
    }, refreshTime);

    return () => clearInterval(refreshNowPlaying);
  }, []);

  useEffect(() => {
    if (!nowPlaying) return;

    if (nowPlaying.item.id !== trackId) {
      console.log("new track");
      setTrackId(nowPlaying.item.id);
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
      <DropDown content="Lyrics" icon={FormatAlignLeft} />
      <DropDown content="Meaning" icon={Help} />
      <DropDown content="Watch Video" icon={YouTube} />
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
        <ListItemText primary={props.content} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <div>This is {props.content}</div>
      </Collapse>
    </List>
  );
}
