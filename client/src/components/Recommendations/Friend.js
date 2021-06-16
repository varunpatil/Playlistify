import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axiosConfig";
import { Box, Button, Paper, Typography, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import SnackBar from "../../SnackBar";

export default function Friend() {
  const [input, setInput] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submit = async () => {
    // instant info snackbar
    const key = SnackBar({
      variant: "info",
      message: "Creating Playlist...",
      persist: true,
      enqueue: enqueueSnackbar,
      close: closeSnackbar,
    });

    try {
      const res = await axios.post("/recommendation/friend/", {
        user_id: input,
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
        message: error.response.data.Error,
        enqueue: enqueueSnackbar,
        close: closeSnackbar,
      });
    }

    // closing info snackbar
    closeSnackbar(key);
  };

  return (
    <div align="center">
      <Paper style={{ padding: 20 }}>
        <Typography variant="h4" component="h1" align="center">
          Enter link to your friend's profile
        </Typography>

        <Typography variant="subtitle1" align="center">
          Make sure the link resembles{" "}
          <code>https://open.spotify.com/user/xyz</code> or{"  "}
          <code>spotify:user:xyz</code>
        </Typography>
      </Paper>

      <Box m={4} />

      <TextField
        placeholder="https://open.spotify.com/user/xyz"
        fullWidth
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />

      <Box m={4} />

      <Button
        variant="contained"
        size="medium"
        color="primary"
        style={{ borderRadius: 25 }}
        onClick={submit}
      >
        <strong>Create recommendation playlist</strong>
      </Button>

      <Box m={4} />

      <div align="left">
        <Paper style={{ padding: 5 }}>
          <Typography variant="subtitle1">
            <ul>
              <li>
                Uses tracks in your friend's public playlists to create a
                recommendation playlist.
              </li>
              <li>Works best when there are multiple playlists.</li>
              <li>This feature is under constant improvement.</li>
              <li>
                Complete the{" "}
                <Button component={Link} color="primary" to={"/survey"}>
                  Survey
                </Button>{" "}
                to help improve the recommendations.
              </li>
            </ul>
          </Typography>
        </Paper>
      </div>
    </div>
  );
}
