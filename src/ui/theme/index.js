import { createMuiTheme } from "@material-ui/core/styles";

const palette = {
  primary: {
    main: "#4fc8ed",
    contrastText: "#FFFFFF"
  },
  secondary: {
    main: "#666f7f"
  }
};
const themeName = "Picton Blue Razzmatazz Tiger";

export default createMuiTheme({ palette, themeName });
