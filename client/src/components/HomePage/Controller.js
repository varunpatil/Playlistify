import React from "react";
import axios from "../../axiosConfig";

import { makeStyles, IconButton, Paper } from "@material-ui/core";

import {
  SkipNext,
  SkipPrevious,
  PlayArrow,
  Repeat,
  RepeatOne,
  Shuffle,
  Pause,
} from "@material-ui/icons";

import { useSnackbar } from "notistack";
import { errorSnackBar } from "../../SnackBar";

export default function Controller({ playback, refresh }) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const shuffle = async () => {
    try {
      await axios.post("/playback/shuffle/", { state: !playback.shuffle });
      refresh();
    } catch {
      errorSnackBar(enqueueSnackbar, closeSnackbar);
    }
  };

  const previous = async () => {
    try {
      await axios.post("/playback/previous/", {});
      refresh();
    } catch {
      errorSnackBar(enqueueSnackbar, closeSnackbar);
    }
  };

  const next = async () => {
    try {
      await axios.post("/playback/next/", {});
      refresh();
    } catch {
      errorSnackBar(enqueueSnackbar, closeSnackbar);
    }
  };

  const repeat = async () => {
    // off -> context -> track -> off
    let state = "track";
    if (playback.repeat === "track") state = "off";
    else if (playback.repeat === "off") state = "context";

    try {
      await axios.post("/playback/repeat/", { state: state });
      refresh();
    } catch {
      errorSnackBar(enqueueSnackbar, closeSnackbar);
    }
  };

  const togglePlayPause = async () => {
    const action = playback.is_playing ? "pause" : "play";

    try {
      await axios.post(`/playback/${action}/`, {});
      refresh();
    } catch {
      errorSnackBar(enqueueSnackbar, closeSnackbar);
    }
  };

  return (
    <Paper className={classes.controls}>
      <IconButton
        className={classes.button}
        color={playback.shuffle ? "primary" : "default"}
        onClick={shuffle}
      >
        <Shuffle />
      </IconButton>

      <IconButton className={classes.button} onClick={previous}>
        <SkipPrevious />
      </IconButton>

      <IconButton className={classes.button} onClick={togglePlayPause}>
        {playback.is_playing ? (
          <Pause style={{ fontSize: 40 }} />
        ) : (
          <PlayArrow style={{ fontSize: 40 }} />
        )}
      </IconButton>

      <IconButton className={classes.button} onClick={next}>
        <SkipNext />
      </IconButton>

      <IconButton
        className={classes.button}
        color={playback.repeat !== "off" ? "primary" : "default"}
        onClick={repeat}
      >
        {playback.repeat !== "track" ? <Repeat /> : <RepeatOne />}
      </IconButton>
    </Paper>
  );
}

// ------------------- Styles -------------------------- //

const useStyles = makeStyles(() => ({
  controls: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "50px",
    padding: "5px",
  },
  button: {
    flex: "1 1 auto",
    margin: "5px",
  },
}));
