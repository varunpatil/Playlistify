import React, { useState } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

import { ExpandMore } from "@material-ui/icons";
import Base from "./Base";

export default function Parent(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Divider />
      <ListItem
        button
        key={props.name}
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
        <List component="div" disablePadding>
          {props.children.map((child) => {
            return (
              <Base
                name={child.name}
                key={child.name}
                path={child.path}
                icon={child.icon}
                toggle={props.toggle}
                hideDivider
                nested
              />
            );
          })}
        </List>
      </Collapse>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
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
