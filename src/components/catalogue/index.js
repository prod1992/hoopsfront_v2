import { collectSelectedIds } from "../../actions/catalogue-actions";
import { PRODUCT_VIEW_TYPE } from "../../constants/catalogue";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";

class SimpleProduct extends Component {
  constructor(props) {
    super(props);
  }

  handleCheckProductId(event, id) {
    this.props.dispatch(collectSelectedIds(id));
  }

  render() {
    const { viewType, simpleProduct, bulkEdit, catalogueStates } = this.props;
    /*console.log(catalogueStates.selectedIds.includes(simpleProduct.id));
        console.log("includes all", catalogueStates.selectedAll);*/
    let item_view_class_name =
        "col-sm-12 col-md-6 col-lg-4 col-xl-3 column-view",
      grid_view_class_name = "grid-view";
    return (
      <div
        className={
          viewType === PRODUCT_VIEW_TYPE["col_view"]
            ? item_view_class_name
            : grid_view_class_name
        }
      >
        <div className="custom-item">
          {bulkEdit && (
            <div className="catalogue-product-check">
              <div className="checkbox-ctrl">
                <div className="custom-checkbox-style">
                  <input
                    name="select_product"
                    className="checkbox"
                    type="checkbox"
                    checked={
                      catalogueStates.selectedAll ||
                      catalogueStates.selectedIds.includes(simpleProduct.id)
                    }
                    onChange={event =>
                      this.handleCheckProductId(event, simpleProduct["id"])
                    }
                  />
                  <b className="icon-mark icon-check-mark-sign" />
                </div>
              </div>
            </div>
          )}
          <Link
            to={`/product/${simpleProduct.id}`}
            className="product-image-frame"
          >
            <img src="../../../assets/resources/images/24365700.jpg" />
          </Link>
          {viewType === PRODUCT_VIEW_TYPE["col_view"] ? (
            <ColumnItemView simpleProduct={simpleProduct} />
          ) : (
            <GridItemView simpleProduct={simpleProduct} />
          )}
        </div>
      </div>
    );
  }
}

function ColumnItemView(props) {
  const simpleProduct = props.simpleProduct;
  return (
    <div className="item-info">
      {/*<div className='custom-row'>
                <a href='#' className='simple-product-ref'>{simpleProduct.simple_product_head}</a>
            </div>*/}
      <div className="custom-row">
        <span className="product-name">{simpleProduct.name}</span>
      </div>
      <div className="custom-row">
        <Chip label={simpleProduct.id} />
        <span className="price">
          $<span>{simpleProduct.product_price || "0.00"}</span>
        </span>
      </div>
      <div className="custom-row">
        <div className="brand">
          <span>Brand</span>:<span>{simpleProduct.brand}</span>
        </div>
        <span className="price-text">BUY PRICE</span>
      </div>
      <div className="custom-row">
        <div className="category-row">
          <span>
            Category: <strong>{simpleProduct.category}</strong>
          </span>
          <span className="grey-text"> | </span>
          <span>
            Vendor: <strong>Example</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

function GridItemView(props) {
  const simpleProduct = props.simpleProduct;
  return (
    <div className="item-info">
      <div className="custom-row flex-wrapper">
        <div className="left-part">
          <span className="product-name">{simpleProduct.name}</span>
          <Chip label={simpleProduct.id} />
        </div>
        <div className="right-part custom-col-2">
          <span className="price">
            $<span>{simpleProduct.product_price || "0.00"}</span>
          </span>
        </div>
      </div>
      <div className="custom-row">
        <div className="brand">
          <span>
            Brand: <strong>{simpleProduct.brand}</strong>
          </span>
        </div>
        <div className="category">
          <span className="grey-text">|</span>
          <span>
            Category: <strong>{simpleProduct.category}</strong>
          </span>
        </div>
        <div className="vendor">
          <span className="grey-text">|</span>
          <span>
            Vendor: <strong>Example</strong>
          </span>
        </div>
        <span className="price-text">BUY PRICE</span>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    catalogueStates: state.catalogueReducer
  };
}

export default connect(mapStateToProps)(SimpleProduct);
