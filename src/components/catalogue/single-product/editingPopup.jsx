import React, { Component } from "react";

import getApiCredentials from "./../../../constants/api";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import Chip from "@material-ui/core/Chip";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
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
      <div className="popup_main_block edit_popup">
        <div className="popup">
          <div className="popup_content">
            <div className="popup_vendor_block">
              <div className="popup_vendor_block">
                <div className="popup_vendor_block_title">
                  <h3>Vendor</h3>
                </div>

                <Select
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
              </div>
            </div>
            <div className="popup_product_name_block">
              <div className="popup_product_title">
                <div className="popup_product_select_block">
                  <TextField
                    label="Product name"
                    name="name"
                    value={productInfo.name}
                    className={classes.textField}
                    onChange={e => this.getEditedInfo("name", e.target.value)}
                    margin="none"
                  />
                </div>
              </div>
              <div className="brand_block">
                <div className="brand_block_itemss">
                  <div className="popup_product_select_block">
                    <TextField
                      label="Brand"
                      value={productInfo.brand}
                      className={classes.textField}
                      onChange={e =>
                        this.getEditedInfo("brand", e.target.value)
                      }
                      margin="none"
                    />
                  </div>
                </div>
                <div className="brand_block_itemss">
                  <div className="popup_product_select_block">
                    <TextField
                      label="Min order Qty"
                      value={productInfo.minimum_order_quantity}
                      className={classes.textField}
                      onChange={e =>
                        this.getEditedInfo(
                          "minimum_order_quantity",
                          e.target.value
                        )
                      }
                      margin="none"
                    />
                  </div>
                </div>
              </div>
              <div className="brand_block">
                <div className="brand_block_itemss">
                  <div className="popup_product_select_block">
                    <div className="popup_vendor_block_title">
                      <h3>Category</h3>
                    </div>

                    <Select
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
                  </div>
                </div>
                <div className="brand_block_itemss">
                  <div className="popup_product_select_block">
                    <div className="popup_vendor_block_title">
                      <h3>Sub category</h3>
                    </div>

                    <Select
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
                  </div>
                </div>
              </div>
              <div className="tags_block">
                <div className="brand_block_itemss">
                  <div className="popup_product_select_block">
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
                  </div>
                </div>
                <div className="brand_block_itemss">
                  <div className="popup_product_select_block">
                    <TextField
                      label="Link Url"
                      value={productInfo.link_url}
                      className={classes.textField}
                      onChange={e =>
                        this.getEditedInfo("link_url", e.target.value)
                      }
                      margin="none"
                    />
                  </div>
                </div>
              </div>
              <div className="tags_button_block">
                {productInfo.tags &&
                  productInfo.tags.map((item, index) => {
                    return (
                      <Chip
                        key={index}
                        onDelete={() => this.removeTag(index)}
                        label={item}
                      />
                    );
                  })}
              </div>
            </div>

            <Button onClick={() => this.props.closeModal()} color="primary">
              Cancel
            </Button>
            <Button onClick={this.updateProduct} color="primary">
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    editingProductData: state.editingProductData
  };
}

export default connect(mapStateToProps)(withStyles(styles)(EditingPopup));
