import { createMuiTheme } from "@material-ui/core/styles";

const typography = {
  fontFamily: `Catamaran, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500
};
const palette = {
  primary: {
    main: "#4fc8ed",
    contrastText: "#FFFFFF"
  },
  secondary: {
    main: "#666f7f"
  }
};
const themeName = "Hoops Theme";

export default createMuiTheme({ palette, typography, themeName });
