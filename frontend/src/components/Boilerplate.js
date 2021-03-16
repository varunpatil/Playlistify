import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  CssBaseline,
  SwipeableDrawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SideBar from "./SideBar";

const drawerWidth = 260;

export default function BoilerPlate(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap>
            <strong>APP</strong>
          </Typography>
        </Toolbar>
      </AppBar>

      <Router>
        <nav className={classes.drawer} aria-label="drawer">
          {/* Mobile version */}
          <Hidden smUp>
            <SwipeableDrawer
              container={() => document.body}
              variant="temporary"
              open={mobileOpen}
              onOpen={handleDrawerToggle}
              onClose={handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <SideBar toggle={handleDrawerToggle} />
            </SwipeableDrawer>
          </Hidden>

          {/* Desktop version */}
          <Hidden xsDown>
            <SwipeableDrawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              <SideBar />
            </SwipeableDrawer>
          </Hidden>
        </nav>

        <SnackbarProvider>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {props.children}
          </main>
        </SnackbarProvider>
      </Router>
    </div>
  );
}

// <----------------Styles----------------->

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
