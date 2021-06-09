import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar as AV,
  ListItem,
  ListItemText,
  ListItemAvatar,
  makeStyles,
} from "@material-ui/core";

export default function Avatar() {
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/api/me");
      setUser(res.data);
    };

    getUser();
  }, []);

  return user ? (
    <ListItem>
      <ListItemAvatar>
        <AV
          src={user.images.length > 0 ? user.images[0].url : ""}
          className={classes.avatar}
        />
      </ListItemAvatar>
      <ListItemText>
        <strong>{user.display_name}</strong>
      </ListItemText>
    </ListItem>
  ) : null;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}));
