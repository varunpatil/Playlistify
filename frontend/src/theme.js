import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#121212",
      paper: "#262626",
    },
    success: {
      main: "#1DB954",
    },
    primary: {
      main: "#1DB954",
    },
  },
  typography: {
    fontFamily: ['"Montserrat"', "sans-serif"].join(","),
  },
});
