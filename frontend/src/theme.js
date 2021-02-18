import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#121212",
      paper: "#262626",
      divider: "#3e3e3e",
    },
    primary: {
      main: "#17ad4b",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: [
      "Circular",
      "Helvetica",
      "Arial",
      "Montserrat",
      "sans-serif",
    ].join(","),
  },
});
