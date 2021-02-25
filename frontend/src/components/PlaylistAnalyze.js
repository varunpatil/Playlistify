import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";

import { SkipPrevious, PlayArrow, SkipNext } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  media: {
    // height: 0,
    // paddingTop: "100%",
    width: 195,
    height: 195,
  },
  content: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    // paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
}));

export default function PlaylistAnalyze(props) {
  const classes = useStyles();
  const [data, setData] = useState(null);

  useEffect(async () => {
    const id = props.match.params.id;
    const res = await axios.get(`/api/playlist/analyze/${id}`);
    console.log(res.data);
    setData(res.data);
  }, []);

  return data ? (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={data.image_url}
        title={data.name}
      />
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {data.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {data.description}
          {data.description !== "" ? <br /> : null}
          {`${data.no_of_tracks} Tracks`}
          <br />
          {`${data.followers} Followers`}
        </Typography>
        <div className={classes.controls}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            target="_blank"
            style={{ borderRadius: 25 }}
            href={data.url}
          >
            <strong>open</strong>
          </Button>
        </div>
      </CardContent>
    </Card>
  ) : (
    <Loader />
  );
}
