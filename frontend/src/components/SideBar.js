import React from "react";
import { Link } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

import { TrendingUp, Home } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export default function SideBar() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.toolbar} />

      <List>
        <ListItem button key="home" component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>

        <ListItem button key="top/tracks" component={Link} to="/top/tracks">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={"Top Tracks"} />
        </ListItem>

        <ListItem button key="top/artists" component={Link} to="/top/artists">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={"Top Artists"} />
        </ListItem>
      </List>
    </div>
  );
}
