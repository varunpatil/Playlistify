import React, { useState } from "react";
import {
  Fab,
  makeStyles,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import { PlaylistAdd } from "@material-ui/icons";
import axios from "axios";

const label = {
  short_term: "Last month",
  medium_term: "Last 6 months",
  long_term: "All Time",
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    spacing: 10,
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  iconButton: {
    color: "black",
  },
}));

export default function CreatePlaylistMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const optionsList = [
    {
      title: "🎵 Create Playlist",
      type: "create_playlist",
      subtitle:
        props.type === "Track"
          ? `${label[props.timeRange]} Top 50 Tracks`
          : `Top 5 Tracks from each of your ${
              label[props.timeRange]
            } Top 20 Artists`,
    },
    {
      title: "👌 Recommendation Playlist",
      type: "recommendation_playlist",
      subtitle: `Recommendations based on your ${
        label[props.timeRange]
      } Top 20 ${props.type}s`,
    },
    {
      title: "👯 Similar Artists",
      type: "similar_artists",
      subtitle: `Playlist with similar artists based on your ${
        label[props.timeRange]
      } Top 20 ${props.type}s`,
    },
  ];

  const menuItemClick = (event) => {
    const option = JSON.parse(event.currentTarget.dataset.value);
    CreatePlaylist(props, option);
    setAnchorEl(null);
  };

  const options = optionsList.map((option) => (
    <MenuItem
      key={option}
      onClick={menuItemClick}
      data-value={JSON.stringify(option)}
    >
      <Box>
        <Typography variant="h6">{option.title}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {option.subtitle}
        </Typography>
      </Box>
    </MenuItem>
  ));

  return (
    <Fab aria-label="others" color="primary" className={classes.fab}>
      <IconButton
        aria-label="more"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        className={classes.iconButton}
      >
        <PlaylistAdd />
      </IconButton>

      <Menu
        id="long-menu"
        disableScrollLock
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {options}
      </Menu>
    </Fab>
  );
}

const CreatePlaylist = async (props, option) => {
  let apiPath = "";
  let data1 = {
    name: "",
    description: option.subtitle,
  };
  let data2 = {};

  if (option.type === "create_playlist") {
    if (props.type === "Track") {
      apiPath = "/api/playlist/add/";
      data1.name = "🎵 Top 50 Tracks";
      data2.track_ids = props.trackIds;
    } else {
      apiPath = "playlist/top/artists/";
      data1.name = "🎵 Top 20 Artists";
      data2.artist_ids = props.artistIds;
    }
  } else if (option.type === "recommendation_playlist") {
    apiPath = "/api/recommendation/seed/";
    data1.name = "👌 Recommendations based on your Top 20 " + props.type + "s";

    if (props.type === "Track") {
      data2.track_ids = props.trackIds;
    } else {
      data2.artist_ids = props.artistIds;
    }
  } else if (option.type === "similar_artists") {
    apiPath = "/api/similar_artists/";
    data1.name = "👯 Similar artists for your Top 20 " + props.type + "s";
    data2.artist_ids = props.artistIds;
  }

  let d = new Date();
  const delimiter = " • ";

  data1.name +=
    delimiter +
    label[props.timeRange] +
    delimiter +
    d.toLocaleString("default", { month: "short" }) +
    "'" +
    (d.getFullYear() % 100);

  const res1 = await axios.post("/api/playlist/create/", data1);
  data2.playlist_id = res1.data.playlist_id;
  const res2 = await axios.post(apiPath, data2);
};
