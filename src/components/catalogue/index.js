import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { collectSelectedIds } from "../../actions/catalogue-actions";
import { PRODUCT_VIEW_TYPE } from "../../constants/catalogue";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  card: {
    maxWidth: 400,
    borderRadius: 3,
    boxShadow: "rgba(0, 0, 0, 0) 0px 0px 8px 0px",
    transition: "0.2s ease box-shadow",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 8px 0px"
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
});

class SimpleProduct extends Component {
  constructor(props) {
    super(props);
  }

  handleCheckProductId(event, id) {
    this.props.dispatch(collectSelectedIds(id));
  }

  render() {
    const {
      classes,
      viewType,
      simpleProduct,
      bulkEdit,
      catalogueStates
    } = this.props;
    /*console.log(catalogueStates.selectedIds.includes(simpleProduct.id));
        console.log("includes all", catalogueStates.selectedAll);*/
    let item_view_class_name = {
        xs: 12,
        sm: 12,
        md: 6,
        lg: 4,
        xl: 3
      },
      grid_view_class_name = "grid-view";
    return (
      <Grid
        item
        xs={item_view_class_name.xs}
        sm={item_view_class_name.sm}
        md={item_view_class_name.md}
        lg={item_view_class_name.lg}
        xl={item_view_class_name.xl}
        className={
          viewType !== PRODUCT_VIEW_TYPE["col_view"] && grid_view_class_name
        }
      >
        <Card className={classes.card}>
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
            {console.log(simpleProduct)}
            <CardMedia
              className={classes.media}
              image={simpleProduct.image_name}
              title="Paella dish"
            />
          </Link>
          <CardContent>
            {viewType === PRODUCT_VIEW_TYPE["col_view"] ? (
              <ColumnItemView simpleProduct={simpleProduct} />
            ) : (
              <GridItemView simpleProduct={simpleProduct} />
            )}
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

function ColumnItemView(props) {
  const simpleProduct = props.simpleProduct;
  return (
    <div className="item-info">
      <Grid row className="custom-row">
        <span className="product-name">{simpleProduct.name}</span>
      </Grid>
      <Grid row className="custom-row" justify={"space-between"}>
        <Grid item>
          <Chip label={simpleProduct.id} />
          <div className="brand">
            <span>Brand</span>:<span>{simpleProduct.brand}</span>
          </div>
        </Grid>
        <Grid item>
          <div className="price">
            $<span>{simpleProduct.product_price || "0.00"}</span>
          </div>
          <div className="price-text">BUY PRICE</div>
        </Grid>
      </Grid>

      <Grid row className="custom-row">
        <Grid item>
          Category: <strong>{simpleProduct.category}</strong>
        </Grid>
        <Grid item>
          <span>
            Vendor: <strong>Example</strong>
          </span>
        </Grid>
      </Grid>
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

export default connect(mapStateToProps)(
  withStyles(styles, { theme: true })(SimpleProduct)
);
