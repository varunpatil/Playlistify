import React from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

export default function Base(props) {
  const classes = useStyles();
  return (
    <div>
      {props.hideDivider ? null : <Divider />}
      <ListItem
        button
        key={props.name}
        component={Link}
        to={props.path}
        className={props.nested ? classes.nested : null}
        onClick={props.toggle}
      >
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
        <ListItemText primary={props.name} />
      </ListItem>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
