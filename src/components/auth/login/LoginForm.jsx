import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormGroup from "@material-ui/core/FormGroup";

import PersonIcon from "@material-ui/icons/Person";
import HttpsIcon from "@material-ui/icons/Https";

import SimpleField from "../SimpleField";
import RememberMe from "../RememberMe";

const styles = theme => ({
  cssLabel: {
    color: "#FFFFFF",
    "&$cssFocused": {
      color: "#FFFFFF"
    }
  },
  input: {
    color: "white"
  },
 
  notchedOutline: {
    borderColor: "#FFFFFF"
  },
  button: {
    backgroundColor: "#FFFFFF",
    fontFamily: "inherit",
    color: "#1db3e7",
    borderRadius: "2px",
    fontSize: "1.125rem",
    padding: "12px",
    textTransform: "none"
  }
});

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  const { classes } = this.props;
  return (
    <TextField
      label={label}
      floatingLabelText={label}
      errorText={touched && error}
      InputProps={{
        className: classes.input,
        startAdornment: (
          <InputAdornment position="start">
            <PersonIcon />
          </InputAdornment>
        )
      }}
      {...input}
      {...custom}
    />
  );
};

class LoginForm extends Component {
  render() {
    const { handleSubmit, formGroup, classes } = this.props;
    return (
      <div>
        <h3>{formGroup.headingLabel}</h3>
        <form onSubmit={handleSubmit} autoComplete="off">
          {formGroup["group"].map((item, index) => (
            <FormGroup row key={index}>
              <SimpleField data={item} component={renderTextField} />
            </FormGroup>
          ))}
          {formGroup.name === "login" ? (
            <FormGroup
              row
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "30px 0"
              }}
            >
              <RememberMe />
              <Link style={{ color: "#FFFFFF" }} to="/forget-password">
                Forgot password ?
              </Link>
            </FormGroup>
          ) : null}
          <FormGroup row>
            <Button
              fullWidth
              className={classes.button}
              type={formGroup["name"]}
              variant="contained"
            >
              {formGroup["headingLabel"]}
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(
  withStyles(styles)(reduxForm({ form: "login" })(LoginForm))
);
