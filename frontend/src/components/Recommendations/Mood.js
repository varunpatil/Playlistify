import React, { useState, useEffect } from "react";
import {
  Box,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
  Typography,
  Container,
  Grid,
} from "@material-ui/core";

export default function Mood() {
  const [select, setSelect] = useState(null);
  const classes = useStyles();

  return (
    <Container maxWidth={false}>
      <Grid container spacing={8} justify="center" alignItems="center">
        {moods.map((mood) => (
          <Grid item xs={12} sm="auto" md="auto" lg="auto" xl="auto">
            <Box
              borderColor={select === mood.title ? "primary.main" : "black"}
              border={4}
            >
              <CardActionArea
                className={classes.root}
                onClick={() => {
                  setSelect(mood.title);
                }}
              >
                <CardMedia className={classes.media} image={mood.path} />
                <CardContent>
                  <Typography gutterBottom noWrap align="center">
                    <strong>{mood.title}</strong>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "100%",
  },
  root: {
    width: 320,
    height: 370,
    padding: 12,
    backgroundColor: theme.palette.background.paper,
  },
}));

const moods = [
  {
    title: "Dance",
    path: "../../../static/images/dance.jpg",
    subtitle: "subtitle",
  },
  {
    title: "Energy",
    path: "../../../static/images/energy.jpg",
    subtitle: "subtitle",
  },
  {
    title: "Happy",
    path: "../../../static/images/happy.jpg",
    subtitle: "subtitle",
  },
  {
    title: "Relax",
    path: "../../../static/images/relax.jpg",
    subtitle: "subtitle",
  },
  {
    title: "Sad",
    path: "../../../static/images/sad.jpg",
    subtitle: "subtitle",
  },
];
