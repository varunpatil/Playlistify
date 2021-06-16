import React from "react";
import { Fab } from "@material-ui/core";

export default function Navigate({ goto, title, setPage, left }) {
  let style = {
    position: "fixed",
    bottom: "24px",
    left: null,
    right: null,
  };

  if (left) {
    style.left = window.screen.width <= 600 ? "24px" : "284px"; // drawerWidth(260) + 3*8px
  } else {
    style.right = "24px";
  }

  return (
    <Fab
      variant="extended"
      size="large"
      color="primary"
      onClick={() => setPage(goto)}
      style={style}
    >
      <strong>{title}</strong>
    </Fab>
  );
}
