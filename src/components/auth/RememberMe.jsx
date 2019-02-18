import React, { Component } from "react";
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
  checked: {}
};

class RememberMe extends Component {
  state = {
    isChecked: true
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.isChecked}
                classes={{
                  root: classes.root,
                  checked: classes.checked
                }}
              />
            }
            label="Remember Me"
          />
        </FormGroup>
        <div className="rem-col">
          <Link to="/forget-password">Forgot password ?</Link>
        </div>
      </div>
    );
  }
}

Checkbox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Checkbox);
