import React, { useState, useEffect } from "react";
import { Fab } from "@material-ui/core";

export default function CreatePlaylistButton({ mood, params, artistIds }) {
  return (
    <Fab
      variant="extended"
      size="large"
      color="primary"
      onClick={() => {}}
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
