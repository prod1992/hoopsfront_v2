import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import TextField from "@material-ui/core/TextField";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => <TextField fullWidth={true} label={label} {...input} {...custom} />;

class SimpleField extends Component {
  render() {
    const { icon, name, placeholder, fieldType } = this.props.data;
    return (
      <Field
        name={name}
        component={renderTextField}
        type={fieldType}
        label={placeholder}
      />
    );
  }
}

SimpleField.propTypes = {
  data: PropTypes.object,
  fieldEmpty: PropTypes.func,
  touchedId: PropTypes.array
};

export default SimpleField;
