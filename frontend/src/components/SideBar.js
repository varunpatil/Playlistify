import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import {
  Audiotrack,
  Person,
  Info,
  TrendingUp,
  Home,
  EmojiEmotions,
  PeopleAlt,
  PlaylistPlay,
  PowerSettingsNew,
  Radio,
} from "@material-ui/icons";

import Avatar from "./SideBar/Avatar";
import Base from "./SideBar/Base";
import Parent from "./SideBar/Parent";
import { logout } from "../utils";

export default function SideBar({ toggle }) {
  return (
    <List>
      <Avatar />
      <Divider />
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

      <Base
        name="Playlists"
        path="/playlists"
        icon={PlaylistPlay}
        toggle={toggle}
      />

      <Divider />

      <Parent
        name="Recommendations"
        icon={Radio}
        toggle={toggle}
        children={[
          {
            name: "Friend",
            path: "/recommendation/friend",
            icon: PeopleAlt,
          },
          {
            name: "Mood",
            path: "/recommendation/mood",
            icon: EmojiEmotions,
          },
        ]}
      />

      <Divider />
      <Base name="About" path="/about" icon={Info} toggle={toggle} />
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
