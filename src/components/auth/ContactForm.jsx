import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import { RememberPasswordRow } from "./RememberPassword";
import SimpleField from "./SimpleField";


const styles = theme => ({
  cssLabel: {
    color: "#FFFFFF",
    "&$cssFocused": {
      color: "#FFFFFF"
    }
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

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);


class ContactForm extends Component {
  render() {
    const { handleSubmit, formGroup, classes } = this.props;
    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="fields-heading">{formGroup.headingLabel}</div>
        {formGroup["group"].map((item, index) => (
          <div key={index}>
            <SimpleField key={index} data={item} component={renderTextField}/>
          </div>
        ))}
        {formGroup.name === "login" ? <RememberPasswordRow /> : null}
        <Button type={formGroup["name"]}>{formGroup["headingLabel"]}</Button>
      </form>
    );
  }
}

// ContactForm = reduxForm({
//     // a unique name for the form
//     form: 'contact'
// })(ContactForm);

function mapStateToProps(state) {
  return {
    user: state
  };
}

export default connect(mapStateToProps)(
  reduxForm({ form: "login" })(withStyles(styles)(ContactForm))
);
