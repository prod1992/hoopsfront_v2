import React from "react";

import getApiCredentials from "../../constants/api";
import EditingPopup from "../../components/catalogue/single-product/editingPopup";
import { connect } from "react-redux";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
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
import IconButton from "@material-ui/core/IconButton";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import SingleProductInfoTabs from "../../components/catalogue/single-product/SingleProductInfoTabs";
const styles = theme => ({
  optionLabel: {
    color: "#555",
    marginRight: 3
  },
  editButton: {
    padding: 0,
    minWidth: "auto",
    width: 60,
    height: 20,
    borderRadius: 2,
    fontSize: "0.75rem",
    textTransform: "none",
    marginLeft: 10
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 14
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
    fontWeight: 400
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
  tagsSectionHeading: {
    fontWeight: 400
  },
  tagsList: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    lineHeight: 0,
    "& li + li": {
      marginLeft: 3
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
  },
  dialogRoot: {
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  modalTitle: {
    fontSize: 18,
    margin: 0
  },
  modalDescription: {
    fontSize: 14,
    margin: 0
  },
  fab: {
    position: "absolute",
    bottom: "15px",
    right: "15px"
    // backgroundColor: "#e3645b"
  },
  imageWrapper: {
    position: "relative"
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
    this.setNewProduct = this.setNewProduct.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getProduct(id);
  }
  setNewProduct(data) {
    if (data.size) data.size = data.size.split(",");
    if (data.colour) data.colour = data.colour.split(",");
    if (data.tags) data.tags = data.tags.split(",");

    this.setState({
      product: data
    });
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
    //e.preventDefault();

    let file = e.target.files[0];
    let form = new FormData();
    let token = localStorage["userToken"];
    let uri =
      getApiCredentials.host +
      `/api/products/${this.state.product.id}/upload-image`;
    form.append("image", file, file.name);
    axios
      .request({
        url: uri,
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token
        },
        data: form,
        onUploadProgress: p => {
          console.log(p);
        }
      })
      .then(res => {
        if (res.status == 200) this.setNewProduct(res.data);

        console.log(res);
      })
      .catch(err => {
        console.error("error", err);
      });
  }

  render() {
    const { product } = this.state;

    const { classes, theme } = this.props;

    return (
      product && (
        <React.Fragment>
          <Paper style={{ padding: theme.spacing.unit * 2 }}>
            <Grid container spacing={theme.spacing.unit * 2}>
              <Grid item sm={12} md={4} lg={4}>
                <div
                  className={classes.imageWrapper}
                  onMouseEnter={this.showUploadImageButton}
                  onMouseLeave={this.hideUploadImageButton}
                >
                  <CardMedia
                    className={classes.media}
                    image={`http://18.185.19.120/api/products/image/${
                      product.image_name
                    }`}
                    title={product.title}
                  />
                  <Fab
                    onClick={() => this.imageSelector.current.click()}
                    color="primary"
                    aria-label="Edit"
                    className={`${classes.fab} + ${
                      this.state.ShowUploadImageButton
                        ? classes.show
                        : classes.DNone
                    }`}
                  >
                    <EditIcon />
                  </Fab>
                  <input
                    type="file"
                    ref={this.imageSelector}
                    className={classes.DNone}
                    onChange={e => this.handleImageChange(e)}
                  />
                </div>
              </Grid>
              <Grid item container sm={12} md={8} lg={8}>
                <Grid item xs={12} md>
                  <Grid item container xs spacing={theme.spacing.unit * 2}>
                    <Grid item xs>
                      <h2 className={classes.productTitle}>{product.name}</h2>
                      <div className={classes.productOptions}>
                        <span className={classes.optionLabel}>Brand:</span>
                        <span className={classes.optionValue}>
                          {product.brand}
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={"auto"}>
                      <Chip
                        className={classes.tagStyles}
                        label="Min order Qty: N/A"
                      />
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        className={classes.editButton}
                        onClick={this.openModal}
                      >
                        <EditIcon
                          className={classNames(
                            classes.leftIcon,
                            classes.iconSmall
                          )}
                        />
                        Edit
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={"auto"}>
                  <Chip
                    color="primary"
                    className={classes.tagStyles}
                    variant="outlined"
                    label={"Id: " + product.code}
                  />
                </Grid>

                <Grid item container spacing={theme.spacing.unit * 2} xs={12}>
                  <Grid item xs={12}>
                    <ul className={classes.productOptions}>
                      <li>
                        <span className={classes.optionLabel}>Vendor: </span>

                        <span className={classes.optionValue}>
                          {product.vendor ? product.vendor.vendor_name : ""}
                        </span>
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
                      <span className={classes.productPrice}>
                        ${product.price ? product.price.toFixed(2) : ""}
                      </span>
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
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div className={classes.tagsSection}>
                      <h4 className={classes.tagsSectionHeading}>Colors:</h4>
                      <ul className={classes.tagsList}>
                        {product.colour &&
                          product.colour.map((colour, i) => (
                            <li key={i + 100}>
                              <Chip
                                className={classes.tagStyles}
                                label={colour}
                              />
                            </li>
                          ))}
                      </ul>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <div className={classes.tagsSection}>
                      <h4 className={classes.tagsSectionHeading}>Sizes:</h4>
                      <ul className={classes.tagsList}>
                        {product.size &&
                          product.size.map((size, i) => (
                            <li key={i + 1000}>
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

                  <Grid item xs={12} md={6}>
                    <div className={classes.tagsSection}>
                      <h4 className={classes.tagsSectionHeading}>Tags:</h4>
                      <ul className={classes.tagsList}>
                        {product.tags &&
                          product.tags.map((tag, i) => (
                            <li key={i + 200}>
                              <Chip className={classes.tagStyles} label={tag} />
                            </li>
                          ))}
                      </ul>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Paper
            style={{ padding: theme.spacing.unit * 2 }}
            className={classes.InfoTabsPaper}
          >
            <SingleProductInfoTabs product={product} />
          </Paper>
          <Dialog
            fullWidth={true}
            maxWidth="md"
            classes={{ root: classes.dialogRoot }}
            open={this.state.modalIsOpen}
            onClose={this.closeModal}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
          >
            <DialogTitle id="scroll-dialog-title">
              <header className="popup_header_block">
                <Grid container justify="space-between" spacing={16}>
                  <Grid item>
                    <h3 className={classes.modalTitle}>Edit product detail</h3>
                    <p className={classes.modalDescription}>
                      Provide the following information to edit product detail
                    </p>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <Close onClick={this.closeModal} />
                    </IconButton>
                  </Grid>
                </Grid>
              </header>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <EditingPopup
                  setNewProduct={this.setNewProduct}
                  productData={product}
                  closeModal={this.closeModal}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions />
          </Dialog>
        </React.Fragment>
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
