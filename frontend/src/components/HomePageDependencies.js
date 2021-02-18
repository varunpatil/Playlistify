import React, { useState } from "react";
import Loader from "./Loader";

import {
  makeStyles,
  Card,
  CardContent,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";

import {
  Audiotrack,
  FormatAlignCenter,
  Help,
  YouTube,
  ExpandMore,
} from "@material-ui/icons";

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
        <ExpandMore
          className={[
            classes.dropdown,
            open ? classes.dropdownOpen : classes.dropdownClosed,
          ]}
        />
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
      <Grid container spacing={8} alignItems="center" justify="center">
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
  root: {
    minWidth: 275,
  },
  dropdown: {
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.short,
    }),
  },
  dropdownOpen: {
    transform: "rotate(-180deg)",
  },
  dropdownClosed: {
    transform: "rotate(0)",
  },
}));
