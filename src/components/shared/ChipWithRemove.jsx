import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
const styles = theme => ({
  root: {
    padding: "0 3px",
    fontSize: "0.75rem",
    borderRadius: 15,
    height: 22,
    fontFamily: "inherit",
    "&:not([variant='outlined'])": {
      backgroundColor: "#e9e9e9"
    }
  },
  deleteIcon: {
    width: 16,
    height: 16,
    color: "#FFFFFF"
  }
});
class ChipWithRemove extends React.Component {
  render() {
    const { classes, index, onDelete, label } = this.props;
    return (
      <Chip
        classes={{ root: classes.root, deleteIcon: classes.deleteIcon }}
        key={index}
        onDelete={onDelete}
        label={label}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(ChipWithRemove);
