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

export default function SideBar() {
  return (
    <List>
      <Base name="Home" path="/" icon={Home} />
      <Divider />
      <Parent
        name="Rankings"
        icon={TrendingUp}
        children={[
          {
            name: "Top Tracks",
            path: "/top/tracks",
            icon: Audiotrack,
          },
          {
            name: "Top Artists",
            path: "/top/artists",
            icon: Person,
          },
        ]}
      />
      <Divider />
    </List>
  );
}

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Base = (props) => {
  return (
    <ListItem
      button
      key={props.name}
      component={Link}
      to={props.path}
      className={props.className}
    >
      <ListItemIcon>
        <props.icon />
      </ListItemIcon>
      <ListItemText primary={props.name} />
    </ListItem>
  );
};

const Parent = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  return (
    <div>
      <ListItem
        button
        key={props.name}
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
        <List component="div" disablePadding>
          {props.children.map((child) => {
            return (
              <Base
                name={child.name}
                path={child.path}
                icon={child.icon}
                className={classes.nested}
              />
            );
          })}
        </List>
      </Collapse>
    </div>
  );
};
