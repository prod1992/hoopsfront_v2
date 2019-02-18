import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormGroup from "@material-ui/core/FormGroup";

import RememberMe from "./RememberMe";
import SimpleField from "./SimpleField";
// import HttpsIcon from "@material-ui/icons/Https";
import PersonIcon from "@material-ui/icons/Person";

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
  cssOutlinedInput: {
    borderColor: "#FFFFFF",
    "&$cssFocused $notchedOutline": {
      borderColor: "#FFFFFF"
    }
  },
  notchedOutline: {},
  cssFocused: {}
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

class ContactForm extends Component {
  render() {
    const { handleSubmit, formGroup, classes } = this.props;
    return (
      <div>
        <h3>{formGroup.headingLabel}</h3>
        <form onSubmit={handleSubmit} autoComplete="off">
          {formGroup["group"].map((item, index) => (
            <div key={index}>
              <SimpleField
                key={index}
                data={item}
                component={renderTextField}
              />
            </div>
          ))}
          {formGroup.name === "login" ? <RememberMe /> : null}
          <Button type={formGroup["name"]}>{formGroup["headingLabel"]}</Button>
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
  reduxForm({ form: "login" })(withStyles(styles)(ContactForm))
);
