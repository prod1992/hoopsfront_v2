import {
  AddNewCreatedVendor,
  AddNewVendor
} from "../../../../actions/select.vendor";
import React, { Component } from "react";
import { connect } from "react-redux";
import AddVendorForm from "./addVendorForm";
import getApiCredentials from "../../../../constants/api";

class AddVendor extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    let token = localStorage["userToken"];
    let uri = getApiCredentials.host + "/api/vendors";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(values)
    };
    const reqInstance = new Request(uri, requestOptions);
    fetch(reqInstance)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.json();
        }
      })
      .then(data => {
        console.log(data, "new vendor");
        this.props.dispatch(AddNewCreatedVendor(data));
        // return data;
      })
      .then(() => this.props.dispatch(AddNewVendor(false)))
      .catch(err => console.log(err, "error"));
  }

  render() {
    return (
      <div className="add-vendor-fields">
        <AddVendorForm onSubmit={this.submit} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AddVendor);
