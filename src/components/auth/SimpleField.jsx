import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import TextField from "@material-ui/core/TextField";


const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <TextField
    label={label}
    {...input}
    {...custom}
  />
);

class SimpleField extends Component {
  render() {
    const { icon, name, placeholder, fieldType, label, id } = this.props.data;
    return (
      <div className="input-field input-white untouched">
        <div className="icon-section">
          <i className="material-icons">{icon}</i>
        </div>
        <Field
          name={name}
          className="exact-field"
          component={renderTextField}
          type={fieldType}
          label={placeholder}

        />
        {/*<div className='field-animation-wrapper'>*/}
        {/*<label className='input-label' htmlFor={name}>{label}</label>*/}
        {/*</div>*/}
      </div>
    );
  }
}

SimpleField.propTypes = {
  data: PropTypes.object,
  fieldEmpty: PropTypes.func,
  touchedId: PropTypes.array
};

export default SimpleField;
