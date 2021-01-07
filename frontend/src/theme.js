import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { green } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#121212",
      paper: "#262626",
      divider: "#3e3e3e",
    },
    primary: {
      main: "#1DB954",
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
