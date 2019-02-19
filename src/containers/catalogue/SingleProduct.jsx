import React, { Component } from "react";
import Modal from "react-modal";
import getApiCredentials from "../../constants/api";
//import EditingPopup from "./editingPopup";
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

Modal.setAppElement("#root");
const styles = {
  tag: {
    background: "red"
  },
  Heading: {
    color: "#555"
  },
  optionsOwner: {
    fontSize: ".875rem"
  },
  price: {
    color: "#1DB3E7",
    fontWeight: "600",
    fontSize: "1.875rem"
  },
  BuyPrice: {
    fontSize: ".815rem"
  },
  productLinkTo: {
    color: "#111",
    fontSize: "1.5em",
    textDecoration: "none",
    fontWeight: 600
  },
  Proportys: {
    color: "#555",
    fontSize: "16px",
    lineHeight: "1.5",
    fontWeight: "600"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};
class SingleProduct extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      product: {}
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.imageSelector = React.createRef();
  }

  componentDidMount() {
    const api = getApiCredentials.host;
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

  handleImageChange(e) {
    e.preventDefault();

    let file = e.target.files[0];

    let data = new FormData();

    data.append("file", file, file.name);

    console.log(file, data);
  }

  render() {
    const { product } = this.state;
    const { classes } = this.props;
    // const price = product && JSON.parse(service[0])["29"];
    const price = (Math.random() * 3 + 0.1).toFixed(2);
    console.log(product);
    return (
      product && (
        <Paper className="single-product-wrapper">
          <Grid container className="single-product-data">
            <Grid item style={{ padding: 15 }} sm={4}>
              <div className="product-img-wrap">
                <div className="image-wrapper-inner">
                  <CardMedia
                    className={classes.media}
                    image={product.image_name}
                    title={product.title}
                  />
                  <Fab
                    onClick={() => this.imageSelector.current.click()}
                    color="secondary"
                    aria-label="Edit"
                    className={classes.fab}
                  >
                    <Edit />
                  </Fab>
                  <input
                    type="file"
                    ref={this.imageSelector}
                    className="d-none"
                    onChange={e => this.handleImageChange(e)}
                  />
                </div>
              </div>
            </Grid>
            <Grid item style={{ padding: 15 }} sm={8}>
              <div className="product-info">
                <div className="product-head-info">
                  <div className="product-heading-column">
                    <a href="" className={classes.productLinkTo}>
                      {product.name}
                    </a>
                    <div className={classes.optionsOwner}>
                      <span className={classes.Heading}>Brand: </span>
                      <span className={classes.options}>{product.brand}</span>
                    </div>
                  </div>
                  <div className="product-head-item">
                    <Chip label="Min order Qty: N/A" />
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      <Edit />
                      edit
                    </Button>
                  </div>

                  <Chip
                    color="primary"
                    variant="outlined"
                    label={"Id: " + product.code}
                  />
                </div>
                <div className={classes.optionsOwner}>
                  <div>
                    <span className={classes.Heading}>Vendor:</span>
                    <span classname={classes.options}>Example</span>
                  </div>
                  <div>
                    <span className={classes.Heading}>Category:</span>
                    <span classname={classes.options}>{product.category}</span>
                  </div>
                  <div>
                    <span className={classes.Heading}> Sub Category:</span>
                    <span classname={classes.options}>
                      {product.sub_category}
                    </span>
                  </div>
                </div>
                <div className="price-options">
                  <span className={classes.price}>${price}</span>
                  <span className="buy-b">
                    <LocalMall className={classes.BuyPrice} />
                    <span className={classes.BuyPrice}>Buy Price</span>
                  </span>
                </div>
                <div className="tag-section-wrapper">
                  <div className="tag-section">
                    <div className="item">
                      <span className={classes.Proportys}>Colors:</span>
                      <div className="tags-wrapper">
                        {product.colour &&
                          product.colour.map((colour, i) => (
                            <Chip label={colour} />
                          ))}
                      </div>
                    </div>
                    <div className="item">
                      <span className={classes.Proportys}>Sizes:</span>
                      <div className="tags-wrapper">
                        {product.size &&
                          product.size.map((size, i) => (
                            <Chip variant="outlined" label={size} />
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="tag-section">
                    <div className="item">
                      <span className={classes.Proportys}>Tags:</span>
                      <div className="tags-wrapper">
                        {product.tags &&
                          product.tags.map((tag, i) => <Chip label={tag} />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            className="product-editing-modal"
          />
        </Paper>
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
