import React, { useState } from "react";
import Loader from "./Loader";

import {
  makeStyles,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { ExpandLess, ExpandMore } from "@material-ui/icons";

export const DropDown = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <List className={classes.list}>
      <ListItem
        button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
        <ListItemText primary={props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <props.component {...props} />
      </Collapse>
    </List>
  );
};

export const Text = (props) => {
  const classes = useStyles();
  let output = <Loader />;

  if (props.info) {
    output = (
      <Typography variant="h6" align="center">
        {props.name} Not Found :(
      </Typography>
    );

    const data =
      props.name === "Lyrics" ? props.info.lyrics : props.info.meaning;

    if (data) {
      output = data.map((line) =>
        line !== "" ? (
          <Typography align="center" className={classes.text}>
            {line}
          </Typography>
        ) : (
          <br />
        )
      );
    }
  }
  return output;
};

export const Video = (props) => {
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

export const NothingPlaying = () => {
  // temporary
  return <div>Nothing Playing</div>;
};

// ------------------- Styles -------------------------- //

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
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  text: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
