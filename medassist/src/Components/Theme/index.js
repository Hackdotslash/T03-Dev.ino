import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

let customTheme = createMuiTheme({
  palette: {
    primary: { main: "#BBE1FA" },
    secondary: { main: "#0f4c75" },
    success: {
      main: green[500],
      contrastText: "#fff",
    },
    background: { main: "#1b262c" },
  },
  overrides: {
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        color: "",
        "&$focused": {
          // increase the specificity for the pseudo class
          color: "#0f4c75",
        },
      },
    },
  },
});

customTheme = responsiveFontSizes(customTheme);

export default customTheme;
