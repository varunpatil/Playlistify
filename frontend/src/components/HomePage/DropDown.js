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

export default function DropDown(props){
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
          className={[
            classes.dropdown,
            open ? classes.dropdownOpen : classes.dropdownClosed,
          ]}
        />
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <props.component {...props} />
      </Collapse>
    </List>
  );
};

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
