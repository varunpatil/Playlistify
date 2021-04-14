import React from "react";
import { IconButton, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export default function SnackBar({
  variant,
  message,
  url,
  autoHideDuration = 5000,
  persist = false,
  enqueue,
  close,
}) {
  return enqueue(message, {
    variant: variant,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    persist: persist,
    autoHideDuration: persist ? null : autoHideDuration,
    action: (key) => (
      <>
        {url ? (
          <Button
            variant="outlined"
            size="small"
            style={{ borderRadius: 25 }}
            target="_blank"
            href={url}
          >
            <strong>open</strong>
          </Button>
        ) : null}

        <IconButton onClick={() => close(key)}>
          <CloseIcon />
        </IconButton>
      </>
    ),
  });
}

export function errorSnackBar(
  enqueueSnackbar,
  closeSnackbar,
  message = "Something went wrong 😔. Try again later"
) {
  SnackBar({
    variant: "error",
    message: message,
    enqueue: enqueueSnackbar,
    close: closeSnackbar,
  });
}
