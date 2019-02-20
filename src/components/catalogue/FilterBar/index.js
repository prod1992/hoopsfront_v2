import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import getApiCredentials from "../../../constants/api";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import CloseIcon from "@material-ui/icons/Close";

import { sendSearchQuery } from "../../../actions/search";
import {
  filterShowHide,
  collectSelectedIds
} from "../../../actions/catalogue-actions";
import { filterData } from "../../../actions/filterData";
import { setProducts } from "../../../actions/catalogue-actions";

//import VendordSelector from "./dropdown/VendordSelector";
import RangeComponent from "../../shared/Range";
import MultipleSelect from "../../shared/MultiSelect";

const styles = theme => ({
  list: {
    width: 390
  },
  formGroup: {
    margin: "15px 0"
  },
  filterBlock: {
    padding: 25
  },
  applyButton: {
    margin: 0,
    textTransform: "capitalize",
    borderRadius: 2
  },
  multipleSelect: {
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      width: "100%",
      maxWidth: "100%"
    }
  },
  fullList: {
    width: "auto"
  },
  btnCloseFilter: {
    position: "absolute",
    top: "8px",
    right: "8px"
  }
});

class FilterBar extends React.Component {
  state = {
    vendors: "",
    brands: "",
    categories: "",
    subcategories: "",
    qty_range: [0, 500],
    price_range: [0, 100]
  };
  constructor(props) {
    super(props);
    this.dataHandler = this.dataHandler.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter() {
    const {
      vendors,
      brands,
      categories,
      subcategories,
      qty_range,
      price_range,
      searchVal
    } = this.state;
    let data = {
      qty_min: qty_range.min,
      qty_max: qty_range.max,
      price_range_min: price_range.min,
      price_range_max: price_range.max
    };

    if (searchVal !== "") {
      data.search_value = searchVal;
    }

    if (!!vendors.length) {
      data.vendors = vendors;
    }

    if (!!brands.length) {
      data.brands = brands;
    }

    if (!!categories.length) {
      data.categories = categories;
    }

    if (!!subcategories.length) {
      data.sub_categories = subcategories;
    }
    /*
    if (!!selectedTags.length) {
      data.selected_tags = selectedTags;
    }
*/
    let token = localStorage["userToken"];
    let uri =
      getApiCredentials.host + `/api/products?filter=${JSON.stringify(data)}`;
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
        } else {
          throw response.json();
        }
      })
      .then(data => {
        this.props.dispatch(setProducts(data));
      })
      .catch(err => console.log(err, "error"));

    this.props.dispatch(filterShowHide(false));
  }
  toggleDrawer = open => () => {
    this.props.dispatch(filterShowHide(open));
  };

  dataHandler(arr, name) {
    this.setState({
      [name]: arr
    });
  }

  render() {
    const { classes, catalogueStates } = this.props;

    var vendorsNames = [];
    if (typeof catalogueStates.vendors.data != "undefined") {
      for (let key in catalogueStates.vendors.data) {
        vendorsNames.push(catalogueStates.vendors.data[key].vendor);
      }
    }

    var brandsNames = [];
    if (typeof catalogueStates.brands.data != "undefined") {
      for (let key in catalogueStates.brands.data) {
        brandsNames.push(catalogueStates.brands.data[key].brand);
      }
    }

    var categoriesNames = [];
    if (typeof catalogueStates.categories.data != "undefined") {
      for (let key in catalogueStates.categories.data) {
        categoriesNames.push(catalogueStates.categories.data[key].category);
      }
    }

    var sub_categorieNames = [];
    if (typeof catalogueStates.subcategories.data != "undefined") {
      for (let key in catalogueStates.subcategories.data) {
        sub_categorieNames.push(
          catalogueStates.subcategories.data[key].sub_category
        );
      }
    }

    const {
      qty_range,
      price_range,
      vendors,
      brands,
      categories,
      subcategories
    } = this.state;

    const sideList = (
      <div className={classes.list}>
        <div className={classes.filterBlock}>
          <div>
            <h3 style={{ margin: 0 }}>Filter</h3>
            <p>Select the following items to filter the Catalogues</p>
          </div>
          <div>
            <Button
              onClick={this.applyFilter}
              variant="contained"
              color="primary"
              className={classes.applyButton}
            >
              Apply
            </Button>
          </div>

          <IconButton
            onClick={this.toggleDrawer(false)}
            className={classes.btnCloseFilter}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.filterBlock}>
          <FormGroup className={classes.formGroup}>
            <InputLabel shrink htmlFor="select-multiple-vendor">
              Vendor
            </InputLabel>
            <MultipleSelect
              for="vendors"
              value={vendors}
              changeHandler={this.dataHandler}
              names={vendorsNames}
              InputProps={{
                id: "select-multiple-vendor"
              }}
            />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <InputLabel shrink htmlFor="select-multiple-brand">
              Brand
            </InputLabel>
            <MultipleSelect
              for="brands"
              value={brands}
              changeHandler={this.dataHandler}
              names={brandsNames}
              InputProps={{ id: "select-multiple-brand" }}
            />
          </FormGroup>

          <FormGroup className={classes.formGroup}>
            <InputLabel shrink htmlFor="select-multiple-categories">
              Category
            </InputLabel>
            <MultipleSelect
              for="categories"
              value={categories}
              changeHandler={this.dataHandler}
              names={categoriesNames}
              InputProps={{ id: "select-multiple-categories" }}
            />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <InputLabel shrink htmlFor="select-multiple-subcategories">
              Sub Category
            </InputLabel>
            <MultipleSelect
              for="subcategories"
              value={subcategories}
              changeHandler={this.dataHandler}
              names={sub_categorieNames}
              InputProps={{ id: "select-multiple-subcategories" }}
            />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <InputLabel htmlFor="qty">Min Order Quantity</InputLabel>
            <RangeComponent
              for="qty"
              value={qty_range}
              onChange={value => {
                this.setState({ qty_range: value });
              }}
              min="0"
              max="500"
            />
          </FormGroup>
          <FormGroup className={classes.formGroup}>
            <InputLabel htmlFor="price">Min Order Quantity</InputLabel>
            <RangeComponent
              for="price"
              value={price_range}
              onChange={value => {
                this.setState({ price_range: value });
              }}
              min="0"
              max="100"
            />
          </FormGroup>
        </div>
      </div>
    );

    const filterData = this.props.catalogueStates;
    return (
      <div>
        <Drawer
          anchor="right"
          open={filterData.filterIsOpened}
          onClose={this.toggleDrawer(false)}
        >
          <div tabIndex={0} role="button">
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

FilterBar.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    catalogueStates: state.catalogueReducer,
    searchVal: state.search,
    filteredProducts: state.filterData.filteredProducts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendSearchQuery: bindActionCreators(sendSearchQuery, dispatch),
    filterShowHide: bindActionCreators(filterShowHide, dispatch),
    filterData: bindActionCreators(filterData, dispatch)
  };
}

export default connect(mapStateToProps)(withStyles(styles)(FilterBar));
