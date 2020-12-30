import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  makeStyles,
} from "@material-ui/core";

import {
  Audiotrack,
  Person,
  TrendingUp,
  Home,
  ExpandLess,
  ExpandMore,
  PowerSettingsNew,
} from "@material-ui/icons";

import Loader from "./Loader";
import { logout } from "../utils";

export default function SideBar({ toggle }) {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const res = await axios.get("/api/me");
    setUser(res.data);
  }, []);

  const getUser = () => (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          alt={user.display_name}
          src={user.images.length > 0 ? user.images[0].url : ""}
          className={classes.avatar}
        />
      </ListItemAvatar>
      <ListItemText>
        <strong>{user.display_name}</strong>
      </ListItemText>
    </ListItem>
  );

  return (
    <List>
      {user ? getUser() : <Loader />}
      <Base name="Home" path="/" icon={Home} toggle={toggle} />
      <Divider />
      <Parent
        name="Rankings"
        icon={TrendingUp}
        toggle={toggle}
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

      <ListItem button key="logout" onClick={logout}>
        <ListItemIcon>
          <PowerSettingsNew />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
      <Divider />
    </List>
  );
}

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  avatar: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    marginRight: theme.spacing(2),
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
      onClick={props.toggle}
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
                toggle={props.toggle}
                className={classes.nested}
              />
            );
          })}
        </List>
      </Collapse>
    </div>
  );
};
