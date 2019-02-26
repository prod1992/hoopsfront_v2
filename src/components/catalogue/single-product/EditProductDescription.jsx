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

class EditingPopup extends Component {
  constructor() {
    super();

    this.state = {
      productInfo: {
        brand: "",
        name: "",
        vendor_id: "",
        category: "",
        sub_category: "",
        minimum_order_quantity: 0,
        tags: [],
        link_url: ""
      },
      tagInputValue: ""
    };

    this.updateProduct = this.updateProduct.bind(this);
  }

  componentDidMount() {
    console.log(this.props.productData);
    const {
      id,
      description,
      primary_price_description,
      carton_cubic,
      carton_height,
      carton_length,
      carton_notes,
      carton_weight,
      carton_width,
      quantity_per_carton,
      ...other
    } = this.props.productData;

    this.setState({
      productInfo: {
        ...this.state.productInfo,
        ...other,
        id,
        description,
        primary_price_description,
        carton_cubic,
        carton_height,
        carton_length,
        carton_notes,
        carton_weight,
        carton_width,
        quantity_per_carton
      }
    });
  }

  updateProduct() {
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

    return (
      <Grid container>
        <Grid row={true} container>
          <div className={classes.inputWrapper}>
            <TextField
              label="Description"
              name="description"
              value={productInfo.description}
              className={classes.textField}
              onChange={e => this.getEditedInfo("description", e.target.value)}
              margin="none"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        </Grid>

        <Grid row={true} container>
          <div className={classes.inputWrapper}>
            <TextField
              label="Primary Price Description"
              name="primary_price_description"
              value={productInfo.primary_price_description}
              className={classes.textField}
              onChange={e =>
                this.getEditedInfo("primary_price_description", e.target.value)
              }
              margin="none"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        </Grid>

        <Grid row={true} container spacing={16}>
          <Grid item xs={4}>
            <div className={classes.inputWrapper}>
              <TextField
                label="Height"
                value={productInfo.carton_height}
                className={classes.textField}
                onChange={e =>
                  this.getEditedInfo("carton_height", e.target.value)
                }
                margin="none"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.inputWrapper}>
              <TextField
                label="Width"
                value={productInfo.carton_width}
                className={classes.textField}
                onChange={e =>
                  this.getEditedInfo("carton_width", e.target.value)
                }
                margin="none"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.inputWrapper}>
              <TextField
                label="Depth"
                value={productInfo.carton_length}
                className={classes.textField}
                onChange={e =>
                  this.getEditedInfo("carton_length", e.target.value)
                }
                margin="none"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </Grid>
        </Grid>
        <Grid row={true} container spacing={16}>
          <Grid item xs={4}>
            <div className={classes.inputWrapper}>
              <TextField
                label="Carton Weight"
                value={productInfo.carton_weight}
                className={classes.textField}
                onChange={e =>
                  this.getEditedInfo("carton_weight", e.target.value)
                }
                margin="none"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.inputWrapper}>
              <TextField
                label="Carton Qty"
                value={productInfo.quantity_per_carton}
                className={classes.textField}
                onChange={e =>
                  this.getEditedInfo("quantity_per_carton", e.target.value)
                }
                margin="none"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.inputWrapper}>
              <TextField
                label="Carton Cubic"
                value={productInfo.carton_cubic}
                className={classes.textField}
                onChange={e =>
                  this.getEditedInfo("carton_cubic", e.target.value)
                }
                margin="none"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </div>
          </Grid>
        </Grid>

        <Grid row={true} container>
          <div className={classes.inputWrapper}>
            <TextField
              label="Carton Notes"
              name="carton_notes"
              value={productInfo.carton_notes}
              className={classes.textField}
              onChange={e => this.getEditedInfo("carton_notes", e.target.value)}
              margin="none"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        </Grid>
        <Grid
          row={true}
          container
          className={classes.buttonsBlock}
          spacing={16}
        >
          <Button
            className={classes.buttons}
            onClick={() => this.props.closeModal()}
          >
            <Close /> Cancel
          </Button>
          <Button
            className={classes.buttons}
            onClick={this.updateProduct}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    editingProductData: state.editingProductData
  };
}

export default connect(mapStateToProps)(withStyles(styles)(EditingPopup));
