import React from "react";
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
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
