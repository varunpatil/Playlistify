import React, { useState } from "react";
import {
  Collapse,
  makeStyles,
  Paper,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { ExpandMore } from "@material-ui/icons";

export default function Dropdown() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Paper>
        <ListItem
          button
          onClick={() => {
            setOpen(!open);
          }}
        >
          <ListItemIcon>
            <ExpandMore />
          </ListItemIcon>
          <ListItemText primary={"Customize"} />
          <ExpandMore
            className={[
              classes.dropdown,
              open ? classes.dropdownOpen : classes.dropdownClosed,
            ]}
          />
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Typography>Customize</Typography>
        </Collapse>
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  dropdown: {
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.short,
    }),
  },
  dropdownOpen: {
    transform: "rotate(-180deg)",
  },
  dropdownClosed: {
    transform: "rotate(0)",
  },
}));
