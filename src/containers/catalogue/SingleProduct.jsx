import React from "react";

import getApiCredentials from "../../constants/api";
import EditingPopup from "../../components/catalogue/single-product/editingPopup";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Edit from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import LocalMall from "@material-ui/icons/LocalMall";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Close from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions";
import SingleProductInfoTabs from "../../components/catalogue/single-product/singleProductInfoTabs";
const styles = theme => ({
  optionLabel: {
    color: "#555",
    marginRight: 3
  },
  productOptions: {
    fontSize: ".875rem",
    listStyle: "none",
    display: "flex",
    padding: 0
  },
  productOption: {
    marginLeft: 10
  },
  productPrice: {
    color: "#1DB3E7",

    fontSize: "1.875rem",
    fontWeight: 600
  },
  priceStyles: {
    fontSize: ".815rem"
  },
  productTitle: {
    color: "#111",
    fontSize: "1.5em",
    textDecoration: "none",
    fontWeight: 400,
    margin: 0
  },
  properties: {
    color: "#555",
    fontSize: "16px",
    lineHeight: "1.5",
    fontWeight: "600"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  tagStyles: {
    padding: "0 3px",
    fontSize: "0.75rem",
    borderRadius: 100,
    height: 22,
    fontFamily: "inherit",
    "&:not([variant='outlined'])": {
      //backgroundColor: "#e9e9e9"
    }
  },
  tagsSection: {
    marginTop: 50
  },
  tagsList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    "& li": {
      marginRight: 3
    }
  },
  ModalClass: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  DNone: {
    display: "none"
  },
  InfoTabsPaper: {
    marginTop: "30px"
  }
});
class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      ShowUploadImageButton: false,
      product: {}
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showUploadImageButton = this.showUploadImageButton.bind(this);
    this.hideUploadImageButton = this.hideUploadImageButton.bind(this);
    this.imageSelector = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getProduct(id);
  }

  getProduct(productId) {
    let token = localStorage["userToken"];
    let uri = getApiCredentials.host + `/api/products/${productId}`;
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
      .then(res => res.json())
      .then(data => {
        if (data.size) data.size = data.size.split(",");
        if (data.colour) data.colour = data.colour.split(",");
        if (data.tags) data.tags = data.tags.split(",");

        this.setState({ product: data });
      })
      .catch(err => console.log("error ", err));
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  showUploadImageButton() {
    this.setState({ ShowUploadImageButton: true });
  }

  hideUploadImageButton() {
    this.setState({ ShowUploadImageButton: false });
  }

  handleImageChange(e) {
    e.preventDefault();

    let file = e.target.files[0];

    let data = new FormData();

    data.append("file", file, file.name);

    console.log(file, data);
  }

  render() {
    const { product } = this.state;

    const { classes, theme } = this.props;
    // const price = product && JSON.parse(service[0])["29"];
    const price = (Math.random() * 3 + 0.1).toFixed(2);

    return (
      product && (
        <div>
          <Dialog
            open={this.state.modalIsOpen}
            onClose={this.closeModal}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
          >
            <DialogTitle id="scroll-dialog-title">
              <div>
                <header className="popup_header_block">
                  <h3>Edit product detail</h3>
                  <p>
                    Provide the following information to edit product detail
                  </p>
                </header>
                <Close onClick={this.closeModal} />
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <EditingPopup
                  productData={product}
                  closeModal={this.closeModal}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions />
          </Dialog>

          <Paper
            style={{ padding: theme.spacing.unit }}
            className="single-product-wrapper"
          >
            <Grid container spacing={16} className="single-product-data">
              <Grid item xs={12} sm={4}>
                <div className="product-img-wrap">
                  <div className="image-wrapper-inner">
                    <CardMedia
                      className={classes.media}
                      image={product.image_name}
                      title={product.title}
                      onMouseOver={this.showUploadImageButton}
                      onMouseLeave={this.hideUploadImageButton}
                    />
                    <Fab
                      onClick={() => this.imageSelector.current.click()}
                      color="secondary"
                      aria-label="Edit"
                      className={
                        classes.fab + this.state.ShowUploadImageButton
                          ? classes.show
                          : classes.DNone
                      }
                    >
                      <Edit />
                    </Fab>
                    <input
                      type="file"
                      ref={this.imageSelector}
                      className={classes.DNone}
                      onChange={e => this.handleImageChange(e)}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item container xs={12} sm={8}>
                <Grid item container sm spacing={16}>
                  <Grid item>
                    <div className="product-heading-column">
                      <h2 className={classes.productTitle}>{product.name}</h2>
                      <div className={classes.productOptions}>
                        <span className={classes.optionLabel}>Brand:</span>
                        <span className={classes.optionValue}>
                          {product.brand}
                        </span>
                      </div>
                    </div>
                    <div className="product-info">
                      <ul className={classes.productOptions}>
                        <li>
                          <span className={classes.optionLabel}>Vendor: </span>
                          <span className={classes.optionValue}>Example</span>
                        </li>
                        <li>
                          <span className={classes.optionLabel}>Category:</span>
                          <span className={classes.optionValue}>
                            {product.category}
                          </span>
                        </li>
                        <li>
                          <span className={classes.optionLabel}>
                            {" "}
                            Sub Category:
                          </span>
                          <span className={classes.optionValue}>
                            {product.sub_category}
                          </span>
                        </li>
                      </ul>
                      <div className="price-options">
                        <span className={classes.productPrice}>${price}</span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: ".8125rem"
                          }}
                        >
                          <LocalMall
                            style={{
                              width: 12,
                              height: 12,
                              marginRight: 5,
                              marginTop: -2,
                              fill: "#666f7f"
                            }}
                          />
                          Buy Price
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item>
                    <div className="product-head-info">
                      <div className="product-head-item">
                        <Chip
                          className={classes.tagStyles}
                          label="Min order Qty: N/A"
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={this.openModal}
                    >
                      <Edit />
                      Edit
                    </Button>
                  </Grid>
                  <Grid container spacing={16}>
                    <Grid item xs sm={6}>
                      <div className={classes.tagsSection}>
                        <h4 className={classes.tagsSectionHeading}>Colors:</h4>
                        <ul className={classes.tagsList}>
                          {product.colour &&
                            product.colour.map((colour, i) => (
                              <li key={product.id}>
                                <Chip
                                  className={classes.tagStyles}
                                  label={colour}
                                />
                              </li>
                            ))}
                        </ul>
                      </div>
                    </Grid>
                    <Grid item xs sm={6}>
                      {" "}
                      <div className={classes.tagsSection}>
                        <h4 className={classes.tagsSectionHeading}>Sizes:</h4>
                        <ul className={classes.tagsList}>
                          {product.size &&
                            product.size.map((size, i) => (
                              <li key={product.id}>
                                <Chip
                                  className={classes.tagStyles}
                                  variant="outlined"
                                  label={size}
                                />
                              </li>
                            ))}
                        </ul>
                      </div>
                    </Grid>
                    <Grid item xs sm={6}>
                      <div className={classes.tagsSection}>
                        <h4 className={classes.tagsSectionHeading}>Tags:</h4>
                        <ul className={classes.tagsList}>
                          {product.tags &&
                            product.tags.map((tag, i) => (
                              <li key={product.id}>
                                <Chip
                                  className={classes.tagStyles}
                                  label={tag}
                                />
                              </li>
                            ))}
                        </ul>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid style={{ marginLeft: "auto" }} item sm="auto">
                  <Chip
                    color="primary"
                    className={classes.tagStyles}
                    variant="outlined"
                    label={"Id: " + product.code}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            style={{ padding: theme.spacing.unit }}
            className={classes.InfoTabsPaper}
          >
            <SingleProductInfoTabs product={product} />
          </Paper>
        </div>
      )
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedAll: state.catalogueReducer.selectedAll
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(SingleProduct)
);
