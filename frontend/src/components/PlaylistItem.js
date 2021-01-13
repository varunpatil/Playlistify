import React from "react";

import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Link,
  Typography,
  Box,
  Button,
} from "@material-ui/core";

import { PieChart } from "@material-ui/icons";

export default function PlaylistItem({ playlist }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={playlist.image_url}
        alt={playlist.name}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom noWrap>
          <strong>{playlist.name}</strong>
        </Typography>
        <Box className={classes.tags}>
          {playlist.owner ? <Chip size="small" label="Owner" /> : null}
          <Chip size="small" label={playlist.public ? "Public" : "Private"} />
          <Chip size="small" label={playlist.total_tracks + " Tracks"} />
        </Box>
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          variant="contained"
          className={classes.button}
          size="small"
          endIcon={<PieChart />}
        >
          Analyse
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          size="small"
          endIcon={<PieChart />}
        >
          Analyse
        </Button>
      </CardActions>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  action: {
    paddingTop: 0,
  },
  button: {
    margin: theme.spacing(1),
    fontWeight: "bold",
    backgroundColor: "#818181",
  },
  content: {
    paddingBottom: 0,
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  root: {
    maxWidth: 320,
    padding: 16,
    margin: "auto",
    marginTop: 6,
    marginBottom: 6,
    height: 440,
  },
  tags: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));
