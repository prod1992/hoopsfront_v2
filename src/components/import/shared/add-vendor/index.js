import {
  AddNewCreatedVendor,
  AddNewVendor
} from "../../../../actions/select.vendor";
import React from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import AddVendorForm from "./addVendorForm";
import getApiCredentials from "../../../../constants/api";

function getModalStyle() {
  return {
    top: `0`,
    left: `0`,
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5"
    //transform: `translate(-${top}%, -${left}%)`,
  };
}

class AddVendor extends React.Component {
  constructor(props) {
    super(props);
    this.AddVendor = this.AddVendor.bind(this);
  }

  AddVendor(values) {
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
      <Modal open={true}>
        <div style={getModalStyle()}>
          <AddVendorForm addVendorFunction={this.AddVendor} />
        </div>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(AddVendor);
