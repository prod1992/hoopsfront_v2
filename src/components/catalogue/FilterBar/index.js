import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { bindActionCreators } from "redux";
import RangeComponent from "../../shared/Range";

import Divider from "@material-ui/core/Divider";

import { sendSearchQuery } from "../../../actions/search";
import {
  filterShowHide,
  collectSelectedIds
} from "../../../actions/catalogue-actions";
import { filterData } from "../../../actions/filterData";
//import VendordSelector from "./dropdown/VendordSelector";
import MultipleSelect from "../../shared/MultiSelect";

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  button: {
    margin: theme.spacing.unit
  },
  block: {
    width: "90%",
    marginLeft: "5%"
  }
});

class FilterBar extends React.Component {
  state = {
    vendors: "",
    brands: "",
    categorys: "",
    subcategorys: "",
    qty: [0, 100],
    price: [0, 100]
  };
  constructor(props) {
    super(props);
    this.dataHandler = this.dataHandler.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter() {}
  toggleDrawer = open => () => {
    this.props.dispatch(filterShowHide(open));
  };

  dataHandler(arr, name) {
    this.setState({
      [name]: arr
    });
    console.log(this.state);
  }
  RangeComponentChanged() {}

  render() {
    console.log(this.state);
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

    var categorysNames = [];
    if (typeof catalogueStates.categorys.data != "undefined") {
      for (let key in catalogueStates.categorys.data) {
        categorysNames.push(catalogueStates.categorys.data[key].category);
      }
    }

    var sub_categoryNames = [];
    if (typeof catalogueStates.subcategorys.data != "undefined") {
      for (let key in catalogueStates.subcategorys.data) {
        sub_categoryNames.push(
          catalogueStates.subcategorys.data[key].sub_category
        );
      }
    }
    const {
      qty_range,
      price_range,
      vendors,
      brands,
      categorys,
      subcategorys
    } = this.state;
    const sideList = (
      <div className={classes.list}>
        <div className="filter_title">
          <div className="filter_title_text">
            <h3>Filter</h3>
            <p>Select the following items to filter the Catalogues</p>
          </div>
          <span
            className="close_filther_block"
            onClick={() => this.closeFilter()}
          />
        </div>
        <div className="apply_btn">
          <Button
            onClick={this.applyFilter}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            apply
          </Button>
        </div>
        <div className={classes.block}>
          <Divider />
          <MultipleSelect
            for="vendors"
            value={vendors}
            changeHandler={this.dataHandler}
            names={vendorsNames}
          />
          <MultipleSelect
            for="brands"
            value={brands}
            changeHandler={this.dataHandler}
            names={brandsNames}
          />
          <MultipleSelect
            for="categorys"
            value={categorys}
            changeHandler={this.dataHandler}
            names={categorysNames}
          />
          <MultipleSelect
            for="subcategorys"
            value={subcategorys}
            changeHandler={this.dataHandler}
            names={sub_categoryNames}
          />
          <RangeComponent
            for="qty"
            value={qty_range}
            onChange={(min, max) => {
              this.dataHandler([min, max], "qty_range");
            }}
            min="0"
            max="100"
          />
          <RangeComponent
            for="price"
            value={price_range}
            onChange={(min, max) => {
              this.dataHandler([min, max], "price_range");
            }}
            min="0"
            max="100"
          />
        </div>
      </div>
    );

    // <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
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
