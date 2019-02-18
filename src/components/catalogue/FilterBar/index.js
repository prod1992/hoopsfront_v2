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
  constructor(props) {
    super(props);
    this.dataHandler = this.dataHandler.bind(this);
  }
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };

  toggleDrawer = open => () => {
    this.props.dispatch(filterShowHide(open));
  };

  dataHandler(...args) {
    console.log(...args);
    /*this.setState({
      [name]: arr
    });*/
  }

  render() {
    const { classes, catalogueStates } = this.props;

    var vendors = [];
    if (typeof catalogueStates.vendors.data != "undefined") {
      for (var data in catalogueStates.vendors.data) {
        vendors.push(catalogueStates.vendors.data[data].vendor);
      }
    }

    var brands = [];
    if (typeof catalogueStates.brands.data != "undefined") {
      for (var data in catalogueStates.brands.data) {
        brands.push(catalogueStates.brands.data[data].brand);
      }
    }

    var categorys = [];
    if (typeof catalogueStates.categorys.data != "undefined") {
      for (var data in catalogueStates.categorys.data) {
        categorys.push(catalogueStates.categorys.data[data].category);
      }
    }

    var sub_category = [];
    if (typeof catalogueStates.subcategorys.data != "undefined") {
      for (var data in catalogueStates.subcategorys.data) {
        sub_category.push(catalogueStates.subcategorys.data[data].sub_category);
      }
    }
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
            onChange={this.dataHandler}
            label="asdf"
            names={vendors}
          />
          <MultipleSelect
            onChange={this.dataHandler}
            label="asdf"
            names={brands}
          />
          <MultipleSelect
            onChange={this.dataHandler}
            label="asdf"
            names={categorys}
          />
          <MultipleSelect
            onChange={this.dataHandler}
            label="asdf"
            names={sub_category}
          />
          <RangeComponent onchange={this.dataHandler} min="0" max="100" />
          <RangeComponent onchange={this.dataHandler} min="0" max="100" />
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
