import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

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
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="fields-heading">{formGroup.headingLabel}</div>
        {formGroup["group"].map((item, index) => (
          <div key={index}>
            <SimpleField key={index} data={item} component={renderTextField} />
          </div>
        ))}
        {formGroup.name === "login" ? <RememberMe /> : null}
        <Button type={formGroup["name"]}>{formGroup["headingLabel"]}</Button>
      </form>
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
