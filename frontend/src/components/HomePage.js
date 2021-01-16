import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";

import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";

import {
  ExpandLess,
  ExpandMore,
  FormatAlignLeft,
  Help,
  YouTube,
} from "@material-ui/icons";

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

      <LinearProgress
        variant="determinate"
        className={classes.progress}
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

// ------------------- SubComponents -------------------------- //

const DropDown = (props) => {
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
};

const Text = (props) => {
  const classes = useStyles();
  let output = <Loader />;

  if (props.info) {
    output = (
      <Typography variant="h6" align="center">
        {props.name} Not Found :(
      </Typography>
    );

    const data =
      props.name === "Lyrics" ? props.info.lyrics : props.info.meaning;

    if (data) {
      output = data.map((line) =>
        line !== "" ? (
          <Typography align="center" className={classes.text}>
            {line}
          </Typography>
        ) : (
          <br />
        )
      );
    }
  }
  return output;
};

const Video = (props) => {
  const classes = useStyles();
  let video = <Loader />;
  if (props.info) {
    if (props.info.youtube_embed_url) {
      video = (
        <div className={classes.iframeWrapper}>
          <iframe
            src={props.info.youtube_embed_url}
            className={classes.iframe}
            frameborder="0"
            allowfullscreen
          />
        </div>
      );
    } else {
      video = (
        <Typography variant="h6" align="center">
          Video Not Found :(
        </Typography>
      );
    }
  }
  return video;
};

const NothingPlaying = () => {
  // temporary
  return <div>Nothing Playing</div>;
};

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
  iframe: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  iframeWrapper: {
    height: "0px",
    paddingBottom: "56.2%",
    position: "relative",
  },
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  progress: {
    height: "6px",
  },
  root: {
    marginBottom: theme.spacing(3),
  },
  text: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
