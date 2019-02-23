import React, { Component } from "react";

import getApiCredentials from "./../../../constants/api";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import ChipWithRemove from "../../shared/ChipWithRemove";
import {
  Select,
  Grid,
  MenuItem,
  Button,
  FormControl,
  InputLabel
} from "@material-ui/core";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  inputWrapper: {
    width: "100vh"
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
    const {
      id,
      tags,
      category,
      sub_category,
      brand,
      name,
      services,
      link_url,
      vendor,
      code,
      size,
      colour
    } = this.props.productData;
    this.setState({
      productInfo: {
        ...this.state.productInfo,
        id,
        code,
        size,
        colour,
        vendor,
        tags,
        name,
        category,
        sub_category,
        link_url,
        brand,
        minimum_order_quantity: services[0].minimum_order_quantity
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

  removeTag(index) {
    let updatedTags = [...this.state.productInfo.tags];
    updatedTags.splice(index, 1);
    this.getEditedInfo("tags", updatedTags);
  }

  getInsertedTags(tagName) {
    let updatedTags = [...this.state.productInfo.tags, tagName];
    this.setState({
      productInfo: {
        ...this.state.productInfo,
        tags: updatedTags
      },
      tagInputValue: ""
    });
  }

  render() {
    const { tagInputValue, productInfo } = this.state;
    // const { productData } = this.props;
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid row={true} container spacing={16}>
          <FormControl className={classes.textField}>
            <InputLabel shrink={true} htmlFor="demo-controlled-open-select">
              Vendor
            </InputLabel>
            <Select
              className={classes.textField}
              name="vendor"
              value={productInfo.vendor_id}
              onChange={e => {
                this.getEditedInfo("vendor_id", e.target.value);
              }}
            >
              <MenuItem value="select1">Example Vendor</MenuItem>
              <MenuItem value="select2">Select2</MenuItem>
              <MenuItem value="select3">Select3</MenuItem>
              <MenuItem value="select4">Select4</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid row={true} container spacing={16}>
          <TextField
            label="Product name"
            name="name"
            value={productInfo.name}
            className={classes.textField}
            onChange={e => this.getEditedInfo("name", e.target.value)}
            margin="none"
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid row={true} container spacing={16}>
          <Grid item xs={6}>
            <TextField
              label="Brand"
              value={productInfo.brand}
              className={classes.textField}
              onChange={e => this.getEditedInfo("brand", e.target.value)}
              margin="none"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Min order Qty"
              value={productInfo.minimum_order_quantity}
              className={classes.textField}
              onChange={e =>
                this.getEditedInfo("minimum_order_quantity", e.target.value)
              }
              margin="none"
            />
          </Grid>
        </Grid>

        <Grid row={true} container spacing={16}>
          <Grid item xs={6}>
            <FormControl className={classes.textField}>
              <InputLabel shrink={true} htmlFor="demo-controlled-open-select">
                category
              </InputLabel>
              <Select
                className={classes.textField}
                value={productInfo.category}
                onChange={e => {
                  this.getEditedInfo("category", e.target.value);
                }}
              >
                <MenuItem value="select1">T-Shirts</MenuItem>
                <MenuItem value="select2">Select2</MenuItem>
                <MenuItem value="select3">Select3</MenuItem>
                <MenuItem value="select4">Select4</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.textField}>
              <InputLabel shrink={true} htmlFor="demo-controlled-open-select">
                sub category
              </InputLabel>
              <Select
                className={classes.textField}
                value={productInfo.sub_category}
                onChange={e => {
                  this.getEditedInfo("sub_category", e.target.value);
                }}
              >
                <MenuItem value="select1">Short Sleeve</MenuItem>
                <MenuItem value="select2">Select2</MenuItem>
                <MenuItem value="select3">Select3</MenuItem>
                <MenuItem value="select4">Select4</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid row={true} container spacing={16}>
          <Grid item xs={6}>
            <TextField
              label="Tags"
              value={tagInputValue}
              className={classes.textField}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  this.getInsertedTags(e.target.value);
                }
              }}
              onChange={e =>
                this.setState({
                  tagInputValue: e.target.value
                })
              }
              margin="none"
            />
            <div>
              {productInfo.tags &&
                productInfo.tags.map((item, index) => {
                  return (
                    <ChipWithRemove
                      key={index}
                      onDelete={() => this.removeTag(index)}
                      label={item}
                    />
                  );
                })}
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Link Url"
              value={productInfo.link_url}
              className={classes.textField}
              onChange={e => this.getEditedInfo("link_url", e.target.value)}
              margin="none"
            />
          </Grid>
        </Grid>
        <Grid row={true} container spacing={16}>
          <Grid item xs={6}>
            <Button onClick={() => this.props.closeModal()} color="primary">
              Cancel
            </Button>
            <Button onClick={this.updateProduct} color="primary">
              Save
            </Button>
          </Grid>
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
