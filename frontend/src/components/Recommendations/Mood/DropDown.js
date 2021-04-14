import React, { useState } from "react";
import {
  Box,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Slider,
  Typography,
} from "@material-ui/core";

import { Build, ExpandMore } from "@material-ui/icons";

export default function Dropdown(props) {
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
            <Build />
          </ListItemIcon>
          <ListItemText primary={"Customize"} />
          <ExpandMore
            className={open ? classes.dropdownOpen : classes.dropdownClosed}
          />
        </ListItem>

        <Collapse in={open}>
          <Box paddingX={10}>
            {sliders.map((item) => (
              <div key={item.title}>
                <Typography gutterBottom>{item.title}</Typography>
                <Slider
                  valueLabelDisplay="on"
                  key={item.title}
                  style={{ color: item.color }}
                  value={props.params[item.title.toLowerCase()]}
                  min={item.min}
                  max={item.max}
                  onChange={(e, newValue) => {
                    props.setParams((prev) => {
                      let newParam = { ...prev };
                      newParam[item.title.toLowerCase()] = newValue;
                      return newParam;
                    });
                  }}
                  marks={[
                    {
                      value: item.min,
                      label: item.min,
                    },
                    {
                      value: item.max,
                      label: item.max,
                    },
                  ]}
                />
              </div>
            ))}
          </Box>
        </Collapse>
      </Paper>
    </div>
  );
}

const sliders = [
  {
    title: "Energy",
    color: "#E31A1C",
    min: 0,
    max: 100,
  },
  {
    title: "Valence",
    color: "#33A02C",
    min: 0,
    max: 100,
  },
  {
    title: "Danceability",
    color: "#1F78B4",
    min: 0,
    max: 100,
  },
  {
    title: "Popularity",
    color: "#FF7F00",
    min: 0,
    max: 100,
  },
  {
    title: "Acousticness",
    color: "#B2DF8A",
    min: 0,
    max: 100,
  },
  {
    title: "Tempo",
    color: "#A6CEE3",
    min: 60,
    max: 200,
  },
];

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
