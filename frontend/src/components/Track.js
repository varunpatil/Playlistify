import React from "react";
import PropTypes from "prop-types";

import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(3),
    height: theme.spacing(15),
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    minWidth: theme.spacing(15),
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const Track = ({ track }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={track.album.images[1].url}
        title={track.name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {track.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {track.artists[0].name}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

Track.propTypes = {
  track: PropTypes.object.isRequired,
};

export default Track;
