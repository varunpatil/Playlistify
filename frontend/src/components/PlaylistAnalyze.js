import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import {
  makeStyles,
  Paper,
  Grid,
  Typography,
  Button,
  CardMedia,
} from "@material-ui/core";

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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <CardMedia
              className={classes.cover}
              image={data.image_url}
              title={data.name}
            />
          </Grid>
          <Grid item xs={12} sm>
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
                size="medium"
                color="primary"
                target="_blank"
                style={{ borderRadius: 25 }}
                href={data.url}
              >
                <strong>open</strong>
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  ) : (
    <Loader />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
  },
  cover: {
    width: 180,
    height: 180,
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(1),
  },
}));
