import React from "react";

import {
  makeStyles,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";

import {
  Audiotrack,
  FormatAlignCenter,
  Help,
  YouTube,
} from "@material-ui/icons";

export default function NothingPlaying() {
  const classes = useStyles();
  const fontsize = 80;

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h6" align="center">
            You're not listening to anything on Spotify.
            <br />
            Whenever you're listening, you'll have access to Lyrics, Meaning and
            video of the track.
            <br />
            If you're actually listening, try switching tracks or restarting
            your Spotify App.
          </Typography>
        </CardContent>
      </Card>
      <br /> <br /> <br />
      <Grid
        container
        spacing={8}
        alignItems="center"
        justify="center"
        style={{ margin: 0, width: "100%" }}
      >
        <Grid item>
          <Audiotrack style={{ fontSize: fontsize }} />
        </Grid>
        <Grid item>
          <FormatAlignCenter style={{ fontSize: fontsize }} />
        </Grid>
        <Grid item>
          <Help style={{ fontSize: fontsize }} />
        </Grid>
        <Grid item>
          <YouTube style={{ fontSize: fontsize }} />
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
}));
