import React from "react";
import Loader from "../Loader";
import { makeStyles, Typography } from "@material-ui/core";

export default function Video(props) {
  const classes = useStyles();

  if (!props.info) return <Loader />;

  if (!props.info.youtube_embed_url) {
    return (
      <Typography variant="h6" align="center">
        Video Not Found :(
      </Typography>
    );
  }

  return (
    <div className={classes.iframeWrapper}>
      <iframe
        title="youtube-video"
        src={props.info.youtube_embed_url}
        className={classes.iframe}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

const useStyles = makeStyles(() => ({
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
}));
