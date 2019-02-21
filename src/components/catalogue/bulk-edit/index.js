import {
  BulkEditProduct,
  selectAllProducts,
  setFilteredProductData,
  resetSelectedIds
} from "../../../actions/catalogue-actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import getApiCredentials from "../../../constants/api";
import Book from "@material-ui/icons/Book";
import Info from "@material-ui/icons/Info";
import Delete from "@material-ui/icons/Delete";
import Close from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  catalogueProcessHref: {
    textDecoration: "none",
    fontSize: "16px",
    color: "#1DB3E7"
  },
  automateButton: {
    backgroundColor: "#1DB3E7",
    marginRight: 6,
    minWidth: "40px",
    cursor: "pointer"
  },
  getInfo: {
    color: "#FF9800"
  }
});
class BulkEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedItems: [],
      isChecked: false
    };

    this.selectAllProducts = this.selectAllProducts.bind(this);
  }

  closeEdit() {
    this.props.dispatch(BulkEditProduct(false));
  }

  selectAllProducts(e) {
    const { checked } = e.target;
    let { dispatch } = this.props;
    const { products } = this.props.catalogueReducer;
    const collection = [];

    if (checked) {
      for (let item of products.data) {
        collection.push(item.id);
      }
      dispatch(selectAllProducts(true));
    } else {
      dispatch(selectAllProducts(false));
    }

    this.setState(
      {
        isChecked: checked,
        checkedItems: collection
      },
      () => console.log(this.state)
    );
  }

  handleDeleteItems() {
    const { checkedItems, isChecked } = this.state;
    const { products, selectedIds } = this.props.catalogueReducer;
    let productArray = products["data"];

    selectedIds.forEach(id => {
      let removingIndex = productArray.findIndex(product => product.id === id);
      if (removingIndex !== -1) {
        productArray.splice(removingIndex, 1);
      }
    });

    this.props.dispatch(setFilteredProductData(productArray));
    this.props.dispatch(BulkEditProduct(false));

    let token = localStorage["userToken"];
    let uri = getApiCredentials.host + "/api/products/destroy-multiple";
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ products: selectedIds })
    };
    const reqInstance = new Request(uri, requestOptions);

    return fetch(reqInstance)
      .then(response => response.json())
      .then(() => {
        this.props.dispatch(resetSelectedIds([]));
      })
      .catch(error => console.error(error));
  }

  render() {
    const { selectedIds, products, selectedAll } = this.props.catalogueReducer;
    const { checkedItems, isChecked } = this.state;
    const { classes } = this.props;
    return (
      <div className="bulk-edit-wrapper">
        <div className="bulk-edit-head">
          <a
            href="http://help.hoopscrm.com/use-cases/using-your-catalog-to-automate-your-business"
            className={classes.catalogueProcessHref}
          >
            <Fab
              size="small"
              color="primary"
              className={classes.automateButton}
            >
              <Book />
            </Fab>
            Automate your processes by adding catalogues
          </a>
        </div>
        <div className="bulk-func-row">
          <div className="select-all-option">
            <div className="check-section">
              <div className="catalogue-product-check">
                <div className="checkbox-ctrl">
                  <div className="custom-checkbox-style">
                    <input
                      name="select_product"
                      id="select_all"
                      className="checkbox"
                      type="checkbox"
                      checked={isChecked && selectedAll}
                      onChange={this.selectAllProducts}
                    />
                    <b className="icon-mark icon-check-mark-sign" />
                  </div>
                </div>
              </div>
              <label htmlFor="select_all" className="">
                Select All
              </label>
            </div>
            <p className="selected-count">
              Number of records <span>{selectedIds.length}</span> selected
              records <span>{products["data"] && products["data"].length}</span>
            </p>
          </div>
          <div className="delete-vendor-row">
            <Info className={classes.getInfo} />
            <strong className="">
              Tip Deleting a{" "}
              <a href="#" className="link">
                vendor
              </a>{" "}
              will delete all associated products
            </strong>
          </div>
          <div className="bulk-row-btns">
            <IconButton
              size="small"
              color="primary"
              className={classes.automateButton}
              onClick={() => this.handleDeleteItems()}
            >
              <Delete />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              className={classes.automateButton}
              onClick={() => this.closeEdit()}
            >
              <Close />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    catalogueReducer: state.catalogueReducer,
    products: state.catalogueReducer.products
  };
}
export default connect(mapStateToProps)(withStyles(styles)(BulkEdit));
