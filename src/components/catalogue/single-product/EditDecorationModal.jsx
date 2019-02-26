import React, { Component } from "react";

import getApiCredentials from "./../../../constants/api";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import ChipWithRemove from "../../shared/ChipWithRemove";
import {
  Select,
  Grid,
  MenuItem,
  Button,
  FormControl,
  InputLabel
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
const styles = theme => ({
  textField: {
    width: "100%"
  },

  buttonsBlock: {
    justifyContent: "flex-end"
  },
  buttons: {
    marginLeft: "25px"
  },
  inputWrapper: {
    marginTop: "15px",
    width: "100%"
  }
});

class EditDecorationModal extends Component {
  constructor() {
    super();

    this.state = {};

    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    console.log(this.props.decorationData);
  }

  updateDecoratoin() {
    let token = localStorage["userToken"];
    let uri =
      getApiCredentials.host + `/api/products/${this.state.productInfo.id}`;
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(this.state.productInfo)
    };
    const reqInstance = new Request(uri, requestOptions);
    fetch(reqInstance)
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          this.props.setNewProduct(data);
          this.props.closeModal();
        }
      })
      .catch(err => console.log("error ", err));
  }

  getEditedInfo(name, value) {
    this.setState({
      productInfo: {
        ...this.state.productInfo,
        [name]: value
      }
    });
  }

  render() {
    const { tagInputValue, productInfo } = this.state;
    // const { productData } = this.props;
    const { classes } = this.props;
    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    editingProductData: state.editingProductData
  };
}

export default connect(mapStateToProps)(
  withStyles(styles)(EditDecorationModal)
);
