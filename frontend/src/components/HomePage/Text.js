import React from "react";
import Loader from "../Loader";

import { makeStyles, Typography } from "@material-ui/core";

export default function Text(props){
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

const useStyles = makeStyles((theme) => ({
  text: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
