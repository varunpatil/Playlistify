import React, { useEffect, useState } from "react";
import axios from "axios";

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

export default function Controller({ playback, setPlayback }) {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const shuffle = async () => {
    const shuffleState = playback.shuffle;
    setPlayback({
      ...playback,
      shuffle: !shuffleState,
    });

    try {
      await axios.post("/api/playback/shuffle/", { state: !shuffleState });
    } catch {
      console.log("error hua bhai");
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
      <IconButton className={classes.button}>
        <SkipPrevious />
      </IconButton>
      <IconButton className={classes.button}>
        <Pause style={{ fontSize: 40 }} />
      </IconButton>
      <IconButton className={classes.button}>
        <SkipNext />
      </IconButton>
      <IconButton className={classes.button} color="primary">
        <Repeat />
      </IconButton>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
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
