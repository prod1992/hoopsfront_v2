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

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },

  inputWrapper: {
    marginTop: "15px"
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
                    <MenuItem value="opt1">Option 1</MenuItem>
                    <MenuItem value="opt2">Option 2</MenuItem>
                    <MenuItem value="opt3">Option 3</MenuItem>
                    <MenuItem value="opt4">Option 4</MenuItem>
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
            <Grid item />
          </Grid>
        </Grid>
        <div className={classes.inputWrapper}>
          <div className={classes.inputWrapper} />
          <div className={classes.inputWrapper} />
        </div>
        <div className={classes.inputWrapper}>
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
        </div>
        <div className={classes.inputWrapper}>
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
        </div>
        <div className={classes.inputWrapper}>
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
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.inputWrapper}>
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
          </div>
          <div className={classes.inputWrapper}>
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
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.inputWrapper}>
            <label>Category</label>

            <Select
              name="category"
              value={productDetails.category}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
            >
              <MenuItem value="opt1">Option 1</MenuItem>
              <MenuItem value="opt2">Option 2</MenuItem>
              <MenuItem value="opt3">Option 3</MenuItem>
              <MenuItem value="opt4">Option 4</MenuItem>
            </Select>
          </div>
          <div className={classes.inputWrapper}>
            <label>Subcategory</label>

            <Select
              name="subCategory"
              value={productDetails.subCategory}
              onChange={e => {
                this.getProductDetails(e.target.name, e.target.value);
              }}
            >
              <MenuItem value="opt1">Option 1</MenuItem>
              <MenuItem value="opt2">Option 2</MenuItem>
              <MenuItem value="opt3">Option 3</MenuItem>
              <MenuItem value="opt4">Option 4</MenuItem>
            </Select>
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <header>Carton Details</header>
          <div className="wrapper-row">
            <div className={classes.inputWrapper}>
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
            </div>
            <div className={classes.inputWrapper}>
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
            </div>
            <div className={classes.inputWrapper}>
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
            </div>
            <div className={classes.inputWrapper}>
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
            </div>
            <div className={classes.inputWrapper}>
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
            </div>
            <div className={classes.inputWrapper}>
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
            </div>
          </div>
        </div>
        <div className={classes.inputWrapper}>
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
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.inputWrapper}>
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
          </div>
          <div className={classes.inputWrapper}>
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
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.inputWrapper}>
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
          </div>
          <div className={classes.inputWrapper}>
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
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.inputWrapper}>
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
          </div>
          <div className={classes.inputWrapper}>
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
          </div>
        </div>
        <div className={classes.inputWrapper}>
          <div className={classes.inputWrapper}>
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
          </div>
          <div className={classes.inputWrapper}>
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
          </div>
        </div>
        <div className={classes.inputWrapper}>
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
        </div>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <Button onClick={this.addthisProduct} color="primary">
          Add
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(AddProduct);
