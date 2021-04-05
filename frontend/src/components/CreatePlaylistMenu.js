import React, { useState } from "react";
import axios from "axios";
import { Fab, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { PlaylistAdd } from "@material-ui/icons";

import { useSnackbar } from "notistack";
import SnackBar from "../SnackBar";

export default function CreatePlaylistMenu(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
    CreatePlaylist(props, option, enqueueSnackbar, closeSnackbar);
    setAnchorEl(null);
  };

  const options = optionsList.map((option) => (
    <MenuItem
      key={option}
      onClick={menuItemClick}
      data-value={JSON.stringify(option)}
    >
      <div>
        <Typography variant="h6">{option.title}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {option.subtitle}
        </Typography>
      </div>
    </MenuItem>
  ));

  return (
    <Fab
      color="primary"
      style={{ position: "fixed", bottom: "24px", right: "24px" }}
    >
      <IconButton
        style={{ color: "black" }}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <PlaylistAdd />
      </IconButton>

      <Menu
        keepMounted
        disableScrollLock
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

const label = {
  short_term: "Last month",
  medium_term: "Last 6 months",
  long_term: "All Time",
};

const CreatePlaylist = async (props, option, enqueue, close) => {
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
      apiPath = "/api/playlist/top/artists/";
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

  // API CALLS AND SNACKBAR

  // instant info snackbar
  const key = SnackBar({
    variant: "info",
    message: "Creating Playlist...",
    persist: true,
    enqueue: enqueue,
    close: close,
  });

  try {
    const res1 = await axios.post("/api/playlist/create/", data1);
    data2.playlist_id = res1.data.playlist_id;
    const res2 = await axios.post(apiPath, data2);

    // Success snackbar
    SnackBar({
      variant: "success",
      message: "Playlist Created",
      url: res1.data.url,
      enqueue: enqueue,
      close: close,
    });
  } catch (error) {
    // Error snackbar
    SnackBar({
      variant: "error",
      message: error.response.data.Error
        ? error.response.data.Error
        : "Something went wrong :( Try again later",
      enqueue: enqueue,
      close: close,
    });
  }

  // closing info snackbar
  close(key);
};
