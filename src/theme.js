import { createMuiTheme } from "@material-ui/core";
import { green, red,purple, grey,blueGrey, blue } from "@material-ui/core/colors";
import { dark } from "@material-ui/core/styles/createPalette";

export default createMuiTheme({
  //breakpoints: {
  //  values: {
  //      sm: 1000
  //  },
  //},

  
  palette: {
    primary: red,
    secondary: {
      main: red[500],
    },
  },
});