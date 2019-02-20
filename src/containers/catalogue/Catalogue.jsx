import {
  CSV_DROP_ITEMS,
  CATALOGUE_CONTROL_BTN_TYPES
} from "../../constants/catalogue";
import { PRODUCT_VIEW_TYPE } from "../../constants/catalogue";
import {
  setProducts,
  setVendors,
  setBrands,
  setCategories,
  setSubCategories
} from "../../actions/catalogue-actions";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import FilterBar from "../../components/catalogue/FilterBar";
import DropDown from "../../components/shared/dropdown-menu";
import BulkEdit from "../../components/catalogue/bulk-edit";
import { SIMPLE_PRODUCTS } from "../../constants/fake.data";
import SimpleProduct from "../../components/catalogue";
import getApiCredentials from "../../constants/api";
import Loader from "../../components/shared/loader";
import Filter from "../../components/shared/filter";
import React, { Component } from "react";
import { connect } from "react-redux";
import AddProduct from "../../components/catalogue/single-product/addingPopup";
import IconButton from "@material-ui/core/IconButton";
import Book from "@material-ui/icons/Book";
import ViewModule from "@material-ui/icons/ViewModule";
import ViewList from "@material-ui/icons/ViewList";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
//import FileDownload from "@material-ui/icons/FileDownload";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import VerticalAlignBottom from "@material-ui/icons/VerticalAlignBottom";
import FilterList from "@material-ui/icons/FilterList";

import Modal from "react-modal";

const styles = theme => ({
  catalogueHeader: {
    fontSize: "1.5rem",
    display: "flex",
    fontWeight: "400",
    alignItems: "center",
    marginTop: "5px"
  },
  bookButton: {
    backgroundColor: "#1DB3E7",
    marginRight: 6,
    minWidth: "40px",
    cursor: "pointer"
  },
  CatalogueProcessHref: {
    textDecoration: "none",
    fontSize: "16px",
    color: "#1DB3E7"
  }
});
class Catalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: PRODUCT_VIEW_TYPE["col_view"],
      activeBtn: false,
      bulkEdit: false,
      data: [],

      productAddingModal: false
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.getProductList = this.getProductList.bind(this);
    this.openProductAddingModal = this.openProductAddingModal.bind(this);
    this.closeProductAddingModal = this.closeProductAddingModal.bind(this);
  }

  componentDidMount() {
    this.getProductList();
    this.getVendorsList();
    this.getBrandsList();
    this.getCategoriesList();
    this.getSubCategoriesList();
  }

  openProductAddingModal() {
    this.setState({
      productAddingModal: true
    });
  }

  closeProductAddingModal() {
    this.setState({
      productAddingModal: false
    });
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state.data;
    const { filterData } = this.props;
  }

  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.state.activeBtn !== false
    ) {
      this.setState({
        activeBtn: false
      });
    }
  }

  changeProductView(expectedType) {
    if (expectedType === this.state.viewType) {
      return;
    } else {
      this.setState({
        viewType: expectedType
      });
    }
  }

  showControlDropDown(currentState) {
    if (this.state.activeBtn === currentState) {
      return;
    } else {
      this.setState({
        activeBtn: currentState
      });
    }
  }

  getProductList() {
    let token = localStorage["userToken"];
    let uri = getApiCredentials.host + "/api/products";
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
        this.setState({ data });
        this.props.dispatch(setProducts(data));
      })
      .catch(err => console.log(err, "error111"));
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
        this.setState({ data });
        this.props.dispatch(setVendors(data));
      })
      .catch(err => console.log(err, "error111"));
  }

  getBrandsList() {
    let token = localStorage["userToken"];
    let uri = getApiCredentials.host + "/api/brand";
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
        this.setState({ data });
        this.props.dispatch(setBrands(data));
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
        this.setState({ data });
        this.props.dispatch(setCategories(data));
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
        this.setState({ data });
        this.props.dispatch(setSubCategories(data));
      })
      .catch(err => console.log(err, "error111"));
  }

  render() {
    const productsList = SIMPLE_PRODUCTS["group"];

    const { classes, catalogueStates, products } = this.props;
    return (
      <Grid container className="catalogue-wrapper">
        <Grid item>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Catalogues</h2>
        </Grid>
        <Grid item>
          <a
            href="http://help.hoopscrm.com/use-cases/using-your-catalog-to-automate-your-business"
            className={classes.CatalogueProcessHref}
          >
            <Fab size="small" color="primary" className={classes.bookButton}>
              <Book />
            </Fab>
            Automate your processes by adding catalogues
          </a>
        </Grid>

        <Grid item xs={12}>
          <Grid container justify={"space-between"}>
            <Grid item>
              <div className="action-buttons" ref={this.setWrapperRef}>
                <IconButton
                  onClick={() =>
                    this.changeProductView(PRODUCT_VIEW_TYPE["col_view"])
                  }
                  size="small"
                >
                  <ViewModule
                    className={
                      this.state.viewType === PRODUCT_VIEW_TYPE["col_view"]
                        ? "active"
                        : ""
                    }
                  />
                </IconButton>

                <IconButton
                  onClick={() =>
                    this.changeProductView(PRODUCT_VIEW_TYPE["grid_view"])
                  }
                  size="small"
                >
                  <ViewList
                    className={
                      this.state.viewType === PRODUCT_VIEW_TYPE["grid_view"]
                        ? "active"
                        : ""
                    }
                  />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() =>
                    this.showControlDropDown(CATALOGUE_CONTROL_BTN_TYPES["csv"])
                  }
                >
                  <VerticalAlignBottom
                    className={
                      this.state.activeBtn ===
                      CATALOGUE_CONTROL_BTN_TYPES["csv"]
                        ? "active"
                        : ""
                    }
                  />
                  {this.state.activeBtn ===
                    CATALOGUE_CONTROL_BTN_TYPES["csv"] && (
                    <DropDown group={"DOWNLOAD_CSV"} />
                  )}
                </IconButton>

                <IconButton
                  onClick={() =>
                    this.showControlDropDown(
                      CATALOGUE_CONTROL_BTN_TYPES["import"]
                    )
                  }
                  size="small"
                >
                  <MoreHoriz
                    className={
                      this.state.activeBtn ===
                      CATALOGUE_CONTROL_BTN_TYPES["import"]
                        ? "active"
                        : ""
                    }
                  />
                  {this.state.activeBtn ===
                    CATALOGUE_CONTROL_BTN_TYPES["import"] && (
                    <DropDown
                      group={"CSV_IMPORT_ITEMS"}
                      openProductAddingModal={this.openProductAddingModal}
                    />
                  )}
                </IconButton>
              </div>
            </Grid>
            <Grid item>{!catalogueStates.bulkEdit ? <Filter /> : null}</Grid>
          </Grid>
          <FilterBar />
        </Grid>
        <Modal
          isOpen={this.state.productAddingModal}
          onRequestClose={this.closeProductAddingModal}
          overlayClassName="product-adding-modal-overlay"
          className="product-adding-modal"
        >
          <AddProduct closeModal={this.closeProductAddingModal} />
        </Modal>

        <div className="catalogue-body">
          <div className="shared-scroll-view">
            <div className="catalogue-grid">
              {catalogueStates["bulkEdit"] && <BulkEdit />}
              <div className={`catalogue-item-wrapper ${this.state.viewType}`}>
                <Grid container>
                  {!products["data"] && <Loader />}
                  {products["data"] &&
                    products["data"].map((item, index) => (
                      <SimpleProduct
                        simpleProduct={item}
                        key={index}
                        viewType={this.state.viewType}
                        bulkEdit={catalogueStates["bulkEdit"]}
                      />
                    ))}
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    catalogueStates: state.catalogueReducer,
    products: state.catalogueReducer.products,
    filterData: state.filterData
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Catalogue));
