import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

import {
  Audiotrack,
  Person,
  TrendingUp,
  Home,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function SideBar() {
  const classes = useStyles();
  const [open1, setOpen1] = useState(true);

  return (
    <div>
      <List>
        <ListItem button key="home" component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>

        <Divider />

        <ListItem
          button
          key="top"
          onClick={() => {
            setOpen1(!open1);
          }}
        >
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          <ListItemText primary="Rankings" />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              key="top/tracks"
              component={Link}
              to="/top/tracks"
            >
              <ListItemIcon>
                <Audiotrack />
              </ListItemIcon>
              <ListItemText primary={"Top Tracks"} />
            </ListItem>

            <ListItem
              button
              className={classes.nested}
              key="top/artists"
              component={Link}
              to="/top/artists"
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary={"Top Artists"} />
            </ListItem>
          </List>
        </Collapse>

        <Divider />
      </List>
    </div>
  );
}
