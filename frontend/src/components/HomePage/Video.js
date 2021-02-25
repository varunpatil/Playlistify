import React from "react";
import Loader from "../Loader"

import { makeStyles, Typography } from "@material-ui/core";

export default function Video(props){
  const classes = useStyles();
  let video = <Loader />;
  if (props.info) {
    if (props.info.youtube_embed_url) {
      video = (
        <div className={classes.iframeWrapper}>
          <iframe
            src={props.info.youtube_embed_url}
            className={classes.iframe}
            frameborder="0"
            allowfullscreen
          />
        </div>
      );
    } else {
      video = (
        <Typography variant="h6" align="center">
          Video Not Found :(
        </Typography>
      );
    }
  }
  return video;
};

const useStyles = makeStyles((theme) => ({
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
