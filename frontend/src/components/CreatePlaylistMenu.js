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

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    spacing: 10,
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  iconButton: {
    color: "black",
  },
}));

export default function CreatePlaylistMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const label = {
    short_term: "Last month",
    medium_term: "Last 6 months",
    long_term: "All Time",
  };

  const optionsList = [
    {
      title: "🎵 Create Playlist",
      subtitle:
        props.type === "Track"
          ? `${label[props.timeRange]} Top-50 Tracks`
          : `Top-5 Tracks from each of your ${
              label[props.timeRange]
            } Top-20 Artists`,
    },
    {
      title: "👌 Recommendation Playlist",
      subtitle: `Recommendations based on your ${
        label[props.timeRange]
      } Top-20 ${props.type}s`,
    },
    {
      title: "👯 Similar Artists",
      subtitle: `Playlist with similar artists based on your ${
        label[props.timeRange]
      } Top-20 ${props.type}s`,
    },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = optionsList.map((option) => (
    <MenuItem key={option} onClick={handleClose}>
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
        onClick={handleClick}
        className={classes.iconButton}
      >
        <PlaylistAdd />
      </IconButton>

      <Menu
        id="long-menu"
        disableScrollLock
        keepMounted
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
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
