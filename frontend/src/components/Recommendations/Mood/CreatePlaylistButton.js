import React from "react";
import axios from "axios";
import { Fab } from "@material-ui/core";

import { useSnackbar } from "notistack";
import SnackBar from "../../../SnackBar";

export default function CreatePlaylistButton(props) {
  const { mood, artistIds, artistNames, params } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const CreatePlaylist = async () => {
    // instant info snackbar
    const key = SnackBar({
      variant: "info",
      message: "Creating Playlist...",
      persist: true,
      enqueue: enqueueSnackbar,
      close: closeSnackbar,
    });

    try {
      const res = await axios.post("/api/recommendation/mood/", {
        mood: mood,
        artist_ids: artistIds,
        artist_names: artistNames,
        params: {
          target_acousticness: params.acousticness / 100,
          target_danceability: params.danceability / 100,
          target_energy: params.energy / 100,
          target_valence: params.valence / 100,
          target_popularity: params.popularity,
          target_tempo: params.tempo,
        },
      });

      // Success snackbar
      SnackBar({
        variant: "success",
        message: "Playlist Created",
        url: res.data.url,
        enqueue: enqueueSnackbar,
        close: closeSnackbar,
      });
    } catch (error) {
      // Error snackbar
      SnackBar({
        variant: "error",
        message: error.response.data.Error
          ? error.response.data.Error
          : "Something went wrong :( Try again later",
        enqueue: enqueueSnackbar,
        close: closeSnackbar,
      });
    }

    // closing info snackbar
    closeSnackbar(key);
  };

  return (
    <Fab
      variant="extended"
      size="large"
      color="primary"
      onClick={CreatePlaylist}
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
      }}
    >
      <strong>Create Playlist</strong>
    </Fab>
  );
}
