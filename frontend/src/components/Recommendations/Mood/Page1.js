import React, { useState, useEffect } from "react";
import {
  Box,
  CardActionArea,
  CardMedia,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

import DropDown from "./DropDown";
import Navigate from "./Navigate";
import { MOOD_PARAMS } from "../../../constants";

export default function Page1(props) {
  const classes = useStyles();

  return (
    <Container maxWidth={false}>
      <Paper style={{ padding: 20 }}>
        <Typography variant="title" component="h1" align="center">
          What Is Your Mood?
        </Typography>
      </Paper>

      <Box m={4} />

      <Grid container spacing={8} justify="center" alignItems="center">
        {moods.map((mood) => (
          <Grid
            item
            key={mood.title}
            xs={12}
            sm="auto"
            md="auto"
            lg="auto"
            xl="auto"
          >
            <Box
              border={4}
              borderColor={
                props.mood === mood.title ? "primary.main" : "#ffffff00"
              } // 0 opacity
            >
              <CardActionArea
                className={classes.root}
                onClick={() => {
                  props.setMood(mood.title);
                  props.setParams(MOOD_PARAMS[mood.title]);
                }}
              >
                <CardMedia className={classes.media} image={mood.path} />
                <CardContent>
                  <Typography gutterBottom noWrap align="center">
                    <strong>{mood.title}</strong>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box m={4} />

      {props.mood ? (
        <>
          <DropDown params={props.params} setParams={props.setParams} />
          <Navigate title="Proceed" setPage={props.setPage} goto={2} />
        </>
      ) : null}

      <Box m={4} />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "100%",
  },
  root: {
    width: 320,
    height: 370,
    padding: 12,
    backgroundColor: theme.palette.background.paper,
  },
}));

const moods = [
  {
    title: "Energy",
    path: "../../../static/images/energy.jpg",
    subtitle: "subtitle",
  },
  {
    title: "Happy",
    path: "../../../static/images/happy.jpg",
    subtitle: "subtitle",
  },
  {
    title: "Dance",
    path: "../../../static/images/dance.jpg",
    subtitle: "subtitle",
  },
  {
    title: "Sad",
    path: "../../../static/images/sad.jpg",
    subtitle: "subtitle",
  },
  {
    title: "Relax",
    path: "../../../static/images/relax.jpg",
    subtitle: "subtitle",
  },
];
