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

export default function Controller(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.controls}>
      <IconButton className={classes.button} color="primary">
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
