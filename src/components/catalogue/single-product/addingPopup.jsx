import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Chip,
  Button,
  Select
} from "@material-ui/core";
import ChipWithRemove from "./../../shared/ChipWithRemove";
import getApiCredentials from "./../../../constants/api";
import Close from "@material-ui/icons/Close";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },

  inputWrapper: {
    marginTop: "15px"
  },
  buttonsBlock: {
    justifyContent: "flex-end",
    marginTop: 15
  },
  cartonDetails: {
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20
  }
});
class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productDetails: {
        code: "",
        vendor: "",
        name: "",
        serviceName: "",
        colour: ["Red", "Green", "Yellow"],
        tags: ["example", "example", "example"],
        linkUrl: "",
        stock: "",
        brand: "",
        printArea: "",
        freightDescription: "",
        individualProductPackaging: "",
        stdProductionTime: "",
        size: [],
        category: "",
        subCategory: "",
        description: "",
        primaryPriceDescription: "",
        cartonHeight: "",
        cartonWidth: "",
        cartonDepth: "",
        cartonWeight: "",
        qtyPerCarton: "",
        cartonCubic: "",
        cartonNotes: [],
        qtyBreakPoint1: "",
        qtyBreakPoint1Price: "",
        qtyBreakPoint2: "",
        qtyBreakPoint2Price: "",
        qtyBreakPoint3: "",
        qtyBreakPoint3Price: "",
        qtyBreakPoint4: "",
        qtyBreakPoint4Price: "",
        parentProductCode: "",
        decorationName: "",
        decorationAreas: [],
        decorationAdditional_0_qty_0: "",
        decorationAdditional_0_price_0: "",
        decorationAdditional_0_qty_1: "",
        decorationAdditional_0_price_1: "",
        decoration_0_setupNotes: "",
        decoration_0_setupCost_0: ""
      },
      tagInputValue: "",
      colourInputValue: "",
      sizeInputValue: ""
    };
    this.addthisProduct = this.addthisProduct.bind(this);
    this.getInputedTag = this.getInputedTag.bind(this);
    this.getVendorsList = this.getVendorsList.bind(this);
    this.getCategoriesList = this.getCategoriesList.bind(this);
    this.getSubCategoriesList = this.getSubCategoriesList.bind(this);
  }
  componentDidMount() {
    this.getVendorsList();
    this.getCategoriesList();
    this.getSubCategoriesList();
  }
  getVendorsList() {
    let token = localStorage["userToken"];
    let uri = getApiCredentials.host + "/api/vendors";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    };
    const reqInstance = new Request(uri, requestOptions);
    fetch(reqInstance)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        this.setState({ vendors: data });
      })
      .catch(err => console.log(err, "error111"));
  }
  getCategoriesList() {
    let token = localStorage["userToken"];
    let uri = getApiCredentials.host + "/api/category";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    };
    const reqInstance = new Request(uri, requestOptions);
    fetch(reqInstance)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        this.setState({ categories: data });
      })
      .catch(err => console.log(err, "error111"));
  }

  getSubCategoriesList() {
    let token = localStorage["userToken"];
    let uri = getApiCredentials.host + "/api/subcategory";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token
      }
    };
    const reqInstance = new Request(uri, requestOptions);
    fetch(reqInstance)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        this.setState({ subcategories: data });
      })
      .catch(err => console.log(err, "error111"));
  }

  addthisProduct() {
    let token = localStorage["userToken"];
    let uri = getApiCredentials.host + `/api/products/`;
    var { productDetails } = this.state;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(productDetails)
    };
    const reqInstance = new Request(uri, requestOptions);
    fetch(reqInstance)
      .then(res => res.json())
      .then(data => {
        console.log("data", data);
        if (data.id) {
          this.props.closeModal();
        }
        this.setState({ product: data });
      })
      .catch(err => console.log("error ", err));
  }
  getProductDetails(name, value) {
    this.setState({
      productDetails: {
        ...this.state.productDetails,
        [name]: value
      }
    });
  }

  getInputedTag(tagGroup, tag) {
    let updatedTags = [...this.state.productDetails[tagGroup], tag];
    this.setState({
      productDetails: {
        ...this.state.productDetails,
        [tagGroup]: updatedTags
      },
      tagInputValue: "",
      colourInputValue: "",
      sizeInputValue: ""
    });
  }

  removeTag(tagGroup, index) {
    let updatedTags = [...this.state.productDetails[tagGroup]];
    updatedTags.splice(index, 1);
    this.getProductDetails(tagGroup, updatedTags);
  }

  render() {
    const {
      productDetails,
      tagInputValue,
      colourInputValue,
      sizeInputValue
    } = this.state;
    const { closeModal } = this.props;
    const { classes } = this.props;

    return (
      <div>
        <Grid container>
          <Grid row={true} container spacing={16}>
            <Grid item xs={12}>
              <div className={classes.inputWrapper}>
                <TextField
                  label="Product name"
                  name="name"
                  value={productDetails.name}
                  className={classes.textField}
                  onChange={e => {
                    this.getProductDetails(e.target.name, e.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="none"
                />
              </div>
            </Grid>
          </Grid>
          <Grid row={true} container spacing={16}>
            <Grid item xs={12}>
              <div className={classes.inputWrapper}>
                <FormControl className={classes.textField}>
                  <InputLabel
                    shrink={true}
                    htmlFor="demo-controlled-open-select"
                  >
                    Vendor
                  </InputLabel>
                  <Select
                    label=""
                    name="vendor"
                    value={productDetails.vendor}
                    onChange={e => {
                      this.getProductDetails(e.target.name, e.target.value);
                    }}
                    inputProps={{
                      name: "vendor",
                      id: "demo-controlled-open-select"
                    }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  >
                    {this.state.vendors &&
                      this.state.vendors.data.map((item, key) => {
                        return (
                          <MenuItem key={key} value={item.id}>
                            {item.vendor_name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
          <Grid row={true} container spacing={16}>
            <Grid item xs={6}>
              <div className={classes.inputWrapper}>
                <TextField
                  label="Product code"
                  name="code"
                  value={productDetails.code}
                  className={classes.textField}
                  onChange={e => {
                    this.getProductDetails(e.target.name, e.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="none"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.inputWrapper}>
                <TextField
                  label="Service name"
                  name="serviceName"
                  value={productDetails.serviceName}
                  className={classes.textField}
                  onChange={e => {
                    this.getProductDetails(e.target.name, e.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="none"
                />
              </div>
            </Grid>
          </Grid>
          <Grid row container spacing={16}>
            <Grid item xs={6}>
              <div className={classes.inputWrapper}>
                <TextField
                  label="Stock"
                  name="stock"
                  value={productDetails.stock}
                  className={classes.textField}
                  onChange={e => {
                    this.getProductDetails(e.target.name, e.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="none"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={classes.inputWrapper}>
                <TextField
                  label="Brand"
                  name="brand"
                  value={productDetails.brand}
                  className={classes.textField}
                  onChange={e => {
                    this.getProductDetails(e.target.name, e.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="none"
                />
              </div>
            </Grid>
          </Grid>
          <Grid row container>
            <Grid item xs={12}>
              <div className={classes.inputWrapper}>
                <TextField
                  label="Product colour"
                  name="colour"
                  value={colourInputValue}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      this.setState({
                        colourInputValue: ""
                      });
                      this.getInputedTag("colour", e.target.value);
                    }
                  }}
                  onChange={e =>
                    this.setState({
                      colourInputValue: e.target.value
                    })
                  }
                  margin="none"
                />
                {productDetails.colour &&
                  productDetails.colour.map((item, index) => {
                    return (
                      <ChipWithRemove
                        key={index}
                        onDelete={() => this.removeTag("colour", index)}
                        label={item}
                      />
                    );
                  })}
              </div>
            </Grid>
          </Grid>
          <Grid row container>
            <Grid item xs={12}>
              <div className={classes.inputWrapper}>
                <TextField
                  label="Size"
                  name="sizeInputValue"
                  value={productDetails.sizeInputValue}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      this.setState({
                        sizeInputValue: ""
                      });
                      this.getInputedTag("size", e.target.value);
                    }
                  }}
                  onChange={e =>
                    this.setState({
                      sizeInputValue: e.target.value
                    })
                  }
                  margin="none"
                />
                {productDetails.size &&
                  productDetails.size.map((item, index) => {
                    return (
                      <ChipWithRemove
                        key={index}
                        onDelete={() => this.removeTag("size", index)}
                        label={item}
                      />
                    );
                  })}
              </div>
            </Grid>
          </Grid>
          <Grid row container>
            <Grid item xs={12}>
              <div className={classes.inputWrapper}>
                <TextField
                  label="Tags"
                  name="tagInputValue"
                  value={tagInputValue}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      this.setState({
                        tagInputValue: ""
                      });
                      this.getInputedTag("tags", e.target.value);
                    }
                  }}
                  onChange={e =>
                    this.setState({
                      tagInputValue: e.target.value
                    })
                  }
                  margin="none"
                />
                {productDetails.tags &&
                  productDetails.tags.map((item, index) => {
                    return (
                      <ChipWithRemove
                        key={index}
                        onDelete={() => this.removeTag("tags", index)}
                        label={item}
                      />
                    );
                  })}
              </div>
            </Grid>
          </Grid>
          <Grid row container spacing={16}>
            <Grid item xs={6}>
              <TextField
                label="Link url"
                name="linkUrl"
                value={productDetails.linkUrl}
                className={classes.textField}
                onChange={e => {
                  this.getProductDetails(e.target.name, e.target.value);
                }}
                margin="none"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Print Area"
                name="printArea"
                value={productDetails.printArea}
                className={classes.textField}
                onChange={e => {
                  this.getProductDetails(e.target.name, e.target.value);
                }}
                margin="none"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
          </Grid>
          <Grid row container spacing={16}>
            <Grid item xs={6}>
              <TextField
                label="Freight Description"
                name="freightDescription"
                value={productDetails.freightDescription}
                className={classes.textField}
                onChange={e => {
                  this.getProductDetails(e.target.name, e.target.value);
                }}
                InputLabelProps={{
                  shrink: true
                }}
                margin="none"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Description"
                name="description"
                value={productDetails.description}
                className={classes.textField}
                onChange={e => {
                  this.getProductDetails(e.target.name, e.target.value);
                }}
                InputLabelProps={{
                  shrink: true
                }}
                margin="none"
              />
            </Grid>
          </Grid>

          <Grid row container spacing={16}>
            <Grid item xs={6}>
              <TextField
                label="Primary Price Description"
                name="primaryPriceDescription"
                value={productDetails.primaryPriceDescription}
                className={classes.textField}
                onChange={e => {
                  this.getProductDetails(e.target.name, e.target.value);
                }}
                InputLabelProps={{
                  shrink: true
                }}
                margin="none"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Individual Product Packaging"
                name="individualProductPackaging"
                value={productDetails.individualProductPackaging}
                className={classes.textField}
                onChange={e => {
                  this.getProductDetails(e.target.name, e.target.value);
                }}
                InputLabelProps={{
                  shrink: true
                }}
                margin="none"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid row container spacing={16}>
          <Grid item xs={12}>
            <TextField
              label="Standard Production Time"
              name="stdProductionTime"
              value={productDetails.stdProductionTime}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
        </Grid>
        <Grid row container spacing={16}>
          <Grid item xs={12}>
            <FormControl className={classes.textField}>
              <InputLabel shrink={true} htmlFor="demo-controlled-open-select">
                category
              </InputLabel>
              <Select
                name="category"
                value={productDetails.category}
                onChange={e => {
                  this.getProductDetails(e.target.name, e.target.value);
                }}
                InputLabelProps={{
                  shrink: true
                }}
              >
                {this.state.categories &&
                  this.state.categories.data.map((item, value) => {
                    if (item.category) {
                      return (
                        <MenuItem value={item.category}>
                          {item.category}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid row container spacing={16}>
          <Grid item xs={12}>
            <FormControl className={classes.textField}>
              <InputLabel shrink={true} htmlFor="demo-controlled-open-select">
                Subcategory
              </InputLabel>
              <Select
                name="subCategory"
                value={productDetails.subCategory}
                onChange={e => {
                  this.getProductDetails(e.target.name, e.target.value);
                }}
                InputLabelProps={{
                  shrink: true
                }}
              >
                {this.state.subcategories &&
                  this.state.subcategories.data.map((item, key) => {
                    if (item.sub_category) {
                      return (
                        <MenuItem key={key} value={item.sub_category}>
                          {item.sub_category}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid row container spacing={16} className={classes.cartonDetails}>
          <header>Carton Details</header>
        </Grid>

        <Grid row container spacing={16}>
          <Grid item xs={6}>
            <TextField
              label="Height"
              name="cartonHeight"
              value={productDetails.cartonHeight}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Width"
              name="cartonWidth"
              value={productDetails.cartonWidth}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
        </Grid>

        <Grid row container spacing={16}>
          <Grid item xs={6}>
            <TextField
              label="Depth"
              name="cartonDepth"
              value={productDetails.cartonDepth}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Carton Weight"
              name="cartonWeight"
              value={productDetails.cartonWeight}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
        </Grid>

        <Grid row container spacing={16}>
          <Grid item xs={6}>
            <TextField
              label="Carton QTY"
              name="qtyPerCarton"
              value={productDetails.qtyPerCarton}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cubic"
              name="cartonCubic"
              value={productDetails.cartonCubic}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
        </Grid>

        <Grid row container spacing={16}>
          <Grid item xs={12}>
            <TextField
              label="Carton Notes"
              name="cartonNotes"
              value={productDetails.cartonNotes}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
        </Grid>
        <Grid row container spacing={16}>
          <Grid item xs={6}>
            <TextField
              label="QTY Break Point 1"
              name="qtyBreakPoint1"
              value={productDetails.qtyBreakPoint1}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="QTY Break Point 1 Price"
              name="qtyBreakPoint1Price"
              value={productDetails.qtyBreakPoint1Price}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
        </Grid>

        <Grid row container spacing={16}>
          <Grid item xs={6}>
            <TextField
              label="QTY Break Point 2"
              name="qtyBreakPoint2"
              value={productDetails.qtyBreakPoint2}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="QTY Break Point 2 Price"
              name="qtyBreakPoint2Price"
              value={productDetails.qtyBreakPoint2Price}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
        </Grid>

        <Grid row container spacing={16}>
          <Grid item xs={6}>
            <TextField
              label="QTY Break Point 3 Price"
              name="qtyBreakPoint3Price"
              value={productDetails.qtyBreakPoint3Price}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="QTY Break Point 3"
              name="qtyBreakPoint3"
              value={productDetails.qtyBreakPoint3}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
        </Grid>

        <Grid row container spacing={16}>
          <Grid item xs={6}>
            <TextField
              label="QTY Break Point 4"
              name="qtyBreakPoint4"
              value={productDetails.qtyBreakPoint4}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="QTY Break Point 4 Price"
              name="qtyBreakPoint4Price"
              value={productDetails.qtyBreakPoint4Price}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
        </Grid>

        <Grid row container spacing={16}>
          <Grid item xs={12}>
            <TextField
              label="Parent product code"
              name="parentProductCode"
              value={productDetails.parentProductCode}
              className={classes.textField}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
              InputLabelProps={{
                shrink: true
              }}
              margin="none"
            />
          </Grid>
        </Grid>

        <Grid
          row={true}
          container
          className={classes.buttonsBlock}
          spacing={16}
        >
          <Button className={classes.buttons} onClick={closeModal}>
            <Close /> Cancel
          </Button>
          <Button
            className={classes.buttons}
            onClick={this.addthisProduct}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AddProduct);
