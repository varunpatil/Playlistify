import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Paper, Typography, TextField } from "@material-ui/core";
import { useSnackbar } from 'notistack';
import SnackBar from "../SnackBar"

export default function RecFriend() {
  const [input, setInput] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submit = async () => {
    try {
      // const res = await axios.post("/api/recommendation/friend/", {
      //   user_id: input,
      // });

      SnackBar({
        variant: 'success',
        message: 'Playlist Created',
        url: 'https://www.google.co.in',
        enqueue: enqueueSnackbar,
        close: closeSnackbar
      });

      SnackBar({
        variant: "error",
        message: "something went wrong :(",
        enqueue: enqueueSnackbar,
        close: closeSnackbar
      })

    } catch (error) {
      console.log(error.response.data.Error);
    }
  };

  return (
    <div align="center">
      <Paper style={{ padding: 20 }}>
        <Typography variant="title" component="h1" align="center">
          Enter link to your friend's profile
        </Typography>

        <Typography align="center">
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
    </div>
  );
}
