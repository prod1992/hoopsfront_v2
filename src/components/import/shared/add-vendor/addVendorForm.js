import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { AddNewVendor } from "../../../../actions/select.vendor";
import Clear from "@material-ui/icons/Clear";
class AddVendorForm extends Component {
  constructor(props) {
    super(props);
    this.closeAddVendor = this.closeAddVendor.bind(this);
  }

  closeAddVendor() {
    this.props.dispatch(AddNewVendor(false));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="fields">
          <div className="save-new-vendor">
            <span className="add-v-head">Add vendor</span>
            <button onClick={this.closeAddVendor}>
              <Clear />
              Cencel
            </button>
            <button type="submit" className="save">
              Save
            </button>
          </div>
          <div className="fields-wrap">
            <div className="field-row">
              <div className="simple-field">
                <label htmlFor="name">Vendor name</label>
                <Field
                  name="vendor_name"
                  width="100%"
                  className="vendor-add-field"
                  id="name"
                  component="input"
                  type="text"
                  required="required"
                />
              </div>
              <div className="simple-field">
                <label htmlFor="address">Address</label>
                <Field
                  type="text"
                  width="100%"
                  id="address"
                  component="input"
                  className="vendor-add-field"
                  name="contact_address"
                />
              </div>
            </div>
            <div className="field-row">
              <div className="simple-field">
                <label htmlFor="contact_name">Contact name</label>
                <Field
                  type="text"
                  width="100%"
                  id="contact_name"
                  component="input"
                  className="vendor-add-field"
                  name="contact_name"
                />
              </div>
              <div className="simple-field">
                <label htmlFor="city">City</label>
                <Field
                  type="text"
                  width="100%"
                  id="city"
                  component="input"
                  className="vendor-add-field"
                  name="city"
                />
              </div>
            </div>
            <div className="field-row">
              <div className="simple-field">
                <label htmlFor="contact_email">Contact email</label>
                <Field
                  type="email"
                  width="100%"
                  id="contact_email"
                  component="input"
                  className="vendor-add-field"
                  name="email"
                  required="required"
                />
              </div>
              <div className="simple-field">
                <label htmlFor="text">State</label>
                <Field
                  type="text"
                  width="100%"
                  id="email"
                  component="input"
                  className="vendor-add-field"
                  name="state"
                />
              </div>
            </div>
            <div className="field-row">
              <div className="simple-field">
                <label htmlFor="contact_number">Contact number</label>
                <Field
                  type="number"
                  width="100%"
                  id="contact_number"
                  component="input"
                  className="vendor-add-field"
                  name="contact_number"
                />
              </div>
              <div className="simple-field">
                <label htmlFor="code">Zip code</label>
                <Field
                  type="text"
                  width="100%"
                  id="code"
                  component="input"
                  className="vendor-add-field"
                  name="code"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(
  reduxForm({ form: "addVendorForm" })(AddVendorForm)
);
