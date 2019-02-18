import {
  // CSV_DROP_ITEMS,
  CATALOGUE_CONTROL_BTN_TYPES
} from "../../constants/catalogue";
import { PRODUCT_VIEW_TYPE } from "../../constants/catalogue";
<<<<<<< HEAD
import {
  setProducts,
  setVendors,
  setBrands,
  setCategorys,
  setSubCategorys
} from "../../actions/catalogue-actions";
//import FilterBar from "../../components/catalogue/filter-bar";
import FilterBar from "../../components/catalogue/FilterBar";
import DropDown from "../../components/shared/dropdown-menu";
//import BulkEdit from "../../components/catalogue/bulk-edit";
=======
import { setProducts } from "../../actions/catalogue-actions";
import FilterBar from "../../components/catalogue/filter-bar";
import DropDown from "../../components/shared/dropdown-menu";
import BulkEdit from "../../components/catalogue/bulk-edit";
>>>>>>> 6afca966d49b915b425270e74b373e998b3c954f
import { SIMPLE_PRODUCTS } from "../../constants/fake.data";
import SimpleProduct from "../../components/catalogue";
import getApiCredentials from "../../constants/api";
import Loader from "../../components/shared/loader";
import Filter from "../../components/shared/filter";
import React, { Component } from "react";
import { connect } from "react-redux";
import AddProduct from "../../components/catalogue/single-product/addingPopup";
import Modal from "react-modal";

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
<<<<<<< HEAD

    //TODO check in this file
    this.getVendorsList = this.getVendorsList.bind(this);
    this.getBrandsList = this.getBrandsList.bind(this);
    this.getCategorysList = this.getCategorysList.bind(this);
    this.getSubCategorysList = this.getSubCategorysList.bind(this);

=======
>>>>>>> 6afca966d49b915b425270e74b373e998b3c954f
    this.openProductAddingModal = this.openProductAddingModal.bind(this);
    this.closeProductAddingModal = this.closeProductAddingModal.bind(this);
  }

  componentDidMount() {
    this.getProductList();
<<<<<<< HEAD

    //TODO check in this file
    this.getVendorsList();
    this.getBrandsList();
    this.getCategorysList();
    this.getSubCategorysList();

=======
>>>>>>> 6afca966d49b915b425270e74b373e998b3c954f
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
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
<<<<<<< HEAD
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
=======
>>>>>>> 6afca966d49b915b425270e74b373e998b3c954f
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
<<<<<<< HEAD
        this.props.dispatch(setBrands(data));
      })
      .catch(err => console.log(err, "error111"));
  }

  getCategorysList() {
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
        this.props.dispatch(setCategorys(data));
      })
      .catch(err => console.log(err, "error111"));
  }

  getSubCategorysList() {
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
        this.props.dispatch(setSubCategorys(data));
=======
        this.props.dispatch(setProducts(data));
>>>>>>> 6afca966d49b915b425270e74b373e998b3c954f
      })
      .catch(err => console.log(err, "error111"));
  }

  render() {
    const productsList = SIMPLE_PRODUCTS["group"];

    const { catalogueStates, products } = this.props;
    return (
      <div className="catalogue-wrapper">
        <div className="catalogue-header-roww">
          Catalogue
          <a href="#" className="row-link">
            <div className="row-i-ic">
              <i className="material-icons">book</i>
            </div>
            Automate your processes by adding catalogues
          </a>
        </div>
        <div className="catalogue-functional-header">
          <div className="action-buttons" ref={this.setWrapperRef}>
            <button
              onClick={() =>
                this.changeProductView(PRODUCT_VIEW_TYPE["col_view"])
              }
              className={
                this.state.viewType === PRODUCT_VIEW_TYPE["col_view"]
                  ? "active"
                  : ""
              }
            >
              <i className="material-icons">view_module</i>
            </button>
            <button
              onClick={() =>
                this.changeProductView(PRODUCT_VIEW_TYPE["grid_view"])
              }
              className={
                this.state.viewType === PRODUCT_VIEW_TYPE["grid_view"]
                  ? "active"
                  : ""
              }
<<<<<<< HEAD
            >
              <i className="material-icons">view_list</i>
            </button>
            <button
              className={
                this.state.activeBtn === CATALOGUE_CONTROL_BTN_TYPES["csv"]
                  ? "active"
                  : ""
              }
              onClick={() =>
                this.showControlDropDown(CATALOGUE_CONTROL_BTN_TYPES["csv"])
              }
            >
              <i className="material-icons">file_download</i>
              {this.state.activeBtn === CATALOGUE_CONTROL_BTN_TYPES["csv"] && (
                <DropDown group={"DOWNLOAD_CSV"} />
              )}
            </button>
            <button
              className={
                this.state.activeBtn === CATALOGUE_CONTROL_BTN_TYPES["import"]
                  ? "active"
                  : ""
              }
              onClick={() =>
                this.showControlDropDown(CATALOGUE_CONTROL_BTN_TYPES["import"])
              }
            >
=======
            >
              <i className="material-icons">view_list</i>
            </button>
            <button
              className={
                this.state.activeBtn === CATALOGUE_CONTROL_BTN_TYPES["csv"]
                  ? "active"
                  : ""
              }
              onClick={() =>
                this.showControlDropDown(CATALOGUE_CONTROL_BTN_TYPES["csv"])
              }
            >
              <i className="material-icons">file_download</i>
              {this.state.activeBtn === CATALOGUE_CONTROL_BTN_TYPES["csv"] && (
                <DropDown group={"DOWNLOAD_CSV"} />
              )}
            </button>
            <button
              className={
                this.state.activeBtn === CATALOGUE_CONTROL_BTN_TYPES["import"]
                  ? "active"
                  : ""
              }
              onClick={() =>
                this.showControlDropDown(CATALOGUE_CONTROL_BTN_TYPES["import"])
              }
            >
>>>>>>> 6afca966d49b915b425270e74b373e998b3c954f
              <i className="material-icons">more_horiz</i>
              {this.state.activeBtn ===
                CATALOGUE_CONTROL_BTN_TYPES["import"] && (
                <DropDown
                  group={"CSV_IMPORT_ITEMS"}
                  openProductAddingModal={this.openProductAddingModal}
                />
              )}
            </button>
<<<<<<< HEAD
            <Filter />
=======
>>>>>>> 6afca966d49b915b425270e74b373e998b3c954f
          </div>
          <Modal
            isOpen={this.state.productAddingModal}
            onRequestClose={this.closeProductAddingModal}
            overlayClassName="product-adding-modal-overlay"
            className="product-adding-modal"
          >
            <AddProduct closeModal={this.closeProductAddingModal} />
          </Modal>
<<<<<<< HEAD
=======
          {!catalogueStates.bulkEdit ? <Filter /> : null}
>>>>>>> 6afca966d49b915b425270e74b373e998b3c954f
        </div>
        <FilterBar />
        <div className="catalogue-body">
          <div className="shared-scroll-view">
            <div className="catalogue-grid">
<<<<<<< HEAD
=======
              {catalogueStates["bulkEdit"] && <BulkEdit />}
>>>>>>> 6afca966d49b915b425270e74b373e998b3c954f
              <div className={`catalogue-item-wrapper ${this.state.viewType}`}>
                <div className="row">
                  {!products["data"] && <Loader />}
                  {products["data"] &&
                    products["data"].map((item, index) => (
                      <SimpleProduct
                        simpleProduct={item}
                        key={index}
                        viewType={this.state.viewType}
<<<<<<< HEAD
=======
                        bulkEdit={catalogueStates["bulkEdit"]}
>>>>>>> 6afca966d49b915b425270e74b373e998b3c954f
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    catalogueStates: state.catalogueReducer,
    products: state.catalogueReducer.products,
<<<<<<< HEAD
    filterData: state.filterData,
    categorys: state.catalogueReducer.categorys
=======
    filterData: state.filterData
>>>>>>> 6afca966d49b915b425270e74b373e998b3c954f
  };
}

export default connect(mapStateToProps)(Catalogue);
