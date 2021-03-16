import React from "react";
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
    position: "relative",
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
  rank: {
    position: "absolute",
    color: "white",
    backgroundColor: theme.palette.background.paper,
    borderTopRightRadius: "5em",
    borderBottomRightRadius: "5em",
    paddingRight: "10px",
    paddingLeft: "5px",
  },
}));

export default function TopUnit({ type, rank, unit }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography variant="h6" className={classes.rank}>
        {"#" + rank}
      </Typography>
      <CardMedia
        className={classes.cover}
        image={
          type === "Track"
            ? unit.album.images[1].url
            : unit.images[1]
            ? unit.images[1].url
            : ""
        }
        title={unit.name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6">
            {unit.name}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {type === "Track"
              ? unit.artists[0].name
              : unit.genres.slice(0, 3).join(" | ")}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
