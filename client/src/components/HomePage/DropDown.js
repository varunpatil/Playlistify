import React, { useState } from "react";

import {
  makeStyles,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import { ExpandMore } from "@material-ui/icons";

export default function DropDown(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <List className={classes.list}>
      <ListItem
        button
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
        <ListItemText primary={props.name} />
        <ExpandMore
          className={open ? classes.dropdownOpen : classes.dropdownClosed}
        />
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <props.component {...props} />
      </Collapse>
    </List>
  );
}

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  dropdownOpen: {
    transform: "rotate(-180deg)",
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.short,
    }),
  },
  dropdownClosed: {
    transform: "rotate(0)",
    transition: theme.transitions.create(["transform"], {
      duration: theme.transitions.duration.short,
    }),
  },
}));
