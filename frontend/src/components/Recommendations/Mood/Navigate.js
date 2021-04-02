import React, { useState, useEffect } from "react";
import {
  Button,
  Fab,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";

export default function Navigate({ goto, title, setPage }) {
  const classes = useStyles();
  return (
    <Fab
      variant="extended"
      size="large"
      color="primary"
      // onClick={() => setPage(goto)}
      className={classes.fab}
    >
      <strong>{title}</strong>
    </Fab>
  );
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  iconButton: {
    color: "black",
  },
}));
