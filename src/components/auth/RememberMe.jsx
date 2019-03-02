import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = {
  root: {
    padding: 0,
    color: "white",
    "&$checked": {
      color: "#1db3e7"
    }
  },
  myclass: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  checked: {}
};

class RememberMe extends React.Component {
  state = {
    isChecked: false
  };

  render() {
    const { classes } = this.props;
    return (
      <FormControlLabel
        style={{ marginLeft: "0px" }}
        control={
          <Checkbox
            classes={{
              root: classes.root,
              checked: classes.checked
            }}
            value="isChecked"
          />
        }
        label={
          <span style={{ color: "#FFFFFF" }} className="white-text">
            Remember Me
          </span>
        }
      />
    );
  }
}

RememberMe.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RememberMe);
