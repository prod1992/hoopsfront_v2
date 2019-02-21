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
    maxWidth: "100%",

    borderRadius: 3,
    boxShadow: "rgba(0, 0, 0, 0) 0px 0px 8px 0px",
    transition: "0.2s ease box-shadow",

    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 8px 0px"
    }
  },
  cardContent: {
    flex: 1
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  productHeader: {
    margin: "10px 0"
  },
  productInfo: {
    fontSize: "0.9rem"
  },
  gridView: {
    display: "flex",
    flexDirection: "row"
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

    let item_view_class_name = {
        xs: 12,
        md: 6,
        lg: 4,
        xl: 3
      },
      grid_view_class_name = "grid-view";

    const ColumnItemView = props => {
      return (
        <div className="item-info">
          <Grid container className={classes.productHeader}>
            <Grid item>{simpleProduct.name}</Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item>
              <Chip label={simpleProduct.id} />
              <div className="brand">
                <span>Brand</span>:<span>{simpleProduct.brand}</span>
              </div>
            </Grid>
            <Grid item style={{ textAlign: "right" }}>
              <div className="price">
                $<span>{simpleProduct.product_price || "0.00"}</span>
              </div>
              <div className="price-text">BUY PRICE</div>
            </Grid>
          </Grid>

          <Grid container>
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
    };

    const GridItemView = props => {
      return (
        <Grid container className={classes.productInfo}>
          <Grid item container xs={12}>
            <Grid item xs>
              <Grid item>
                <span className="product-name">{simpleProduct.name}</span>
                <Chip label={simpleProduct.id} />
              </Grid>
              <Grid item container>
                <Grid item className="brand">
                  <span>
                    Brand: <strong>{simpleProduct.brand}</strong>
                  </span>
                </Grid>
                <Grid item className="category">
                  <span className="grey-text">|</span>
                  <span>
                    Category: <strong>{simpleProduct.category}</strong>
                  </span>
                </Grid>
                <Grid item className="vendor">
                  <span>
                    Vendor: <strong>Example</strong>
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <div className="price">
                <div>
                  $<span>{simpleProduct.product_price || "0.00"}</span>
                </div>
                <div>
                  <span className="price-text">BUY PRICE</span>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      );
    };
    return (
      <Grid
        item
        xs={
          viewType !== PRODUCT_VIEW_TYPE["col_view"]
            ? 12
            : item_view_class_name.xs
        }
        md={
          viewType !== PRODUCT_VIEW_TYPE["col_view"]
            ? 12
            : item_view_class_name.md
        }
        lg={
          viewType !== PRODUCT_VIEW_TYPE["col_view"]
            ? 12
            : item_view_class_name.lg
        }
        xl={
          viewType !== PRODUCT_VIEW_TYPE["col_view"]
            ? 12
            : item_view_class_name.xl
        }
      >
        <Card
          className={
            classes.card +
            " " +
            (viewType !== PRODUCT_VIEW_TYPE["col_view"] ? classes.gridView : "")
          }
        >
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
            style={{
              display: "block",
              flex: "1 0 66px",
              maxWidth:
                viewType !== PRODUCT_VIEW_TYPE["col_view"] ? 66 : "100%",
              padding: viewType !== PRODUCT_VIEW_TYPE["col_view"] ? 20 : 0
            }}
            to={`/product/${simpleProduct.id}`}
          >
            <CardMedia
              className={classes.media}
              image={simpleProduct.image_name}
              title={simpleProduct.title}
            />
          </Link>
          <CardContent className={classes.cardContent}>
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

function mapStateToProps(state) {
  return {
    catalogueStates: state.catalogueReducer
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { theme: true })(SimpleProduct)
);
