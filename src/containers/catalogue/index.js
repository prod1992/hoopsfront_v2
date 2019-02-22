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
  setSubCategories,
  BulkEditProduct
} from "../../actions/catalogue-actions";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import FilterBar from "../../components/catalogue/FilterBar";
import DropDown from "../../components/shared/dropdown-menu";
import BulkEdit from "../../components/catalogue/bulk-edit";
import SimpleProduct from "../../components/catalogue";
import getApiCredentials from "../../constants/api";
import Loader from "../../components/shared/loader";
import Filter from "../../components/shared/filter";
import React from "react";
import { connect } from "react-redux";
import AddProduct from "../../components/catalogue/single-product/addingPopup";
import IconButton from "@material-ui/core/IconButton";
import Book from "@material-ui/icons/Book";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Close from "@material-ui/icons/Close";

import ViewModule from "@material-ui/icons/ViewModule";
import ViewList from "@material-ui/icons/ViewList";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Edit from "@material-ui/icons/Edit";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import Add from "@material-ui/icons/Add";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Popper from "@material-ui/core/Popper";
import Button from "@material-ui/core/Button";

//import FileDownload from "@material-ui/icons/FileDownload";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import VerticalAlignBottom from "@material-ui/icons/VerticalAlignBottom";
import FilterList from "@material-ui/icons/FilterList";
import Dialog from "@material-ui/core/Dialog";

const styles = theme => ({
  ModalClass: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  catalogueHeader: {
    fontSize: "1.5rem",
    display: "flex",
    fontWeight: "400",
    alignItems: "center",
    marginTop: "5px"
  },
  automateButton: {
    backgroundColor: "#1DB3E7",
    minWidth: "40px",
    cursor: "pointer",
    marginRight: "5px"
  },
  catalogueProcessHref: {
    textDecoration: "none",
    fontSize: "16px",
    color: "#1DB3E7"
  },
  catalogActionButton: {
    width: 28,
    height: 28,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#405373",
    fontSize: "1.3rem",
    backgroundColor: "#e9e9e9",
    "& svg": {
      maxWidth: 20
    },
    "& + &": {
      marginLeft: 20
    },
    "&:hover, &.active": {
      color: "#b4b4b4"
    }
  },
  importHref: {
    display: "flex",
    textDecoration: "none"
  },
  CatalogueBody: {
    flex: 1,
    width: "100%"
  },
  modalTitle: {
    fontSize: 18,
    margin: 0
  },
  modalDescription: {
    fontSize: 14,
    margin: 0
  },
  closeButton: {
    cursor: "pointer"
  },
  dialogRoot: {
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto"
  }
});
class Catalogue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewType: PRODUCT_VIEW_TYPE["col_view"],
      activeBtn: false,
      bulkEdit: false,
      data: [],
      productAddingModal: true,
      arrow: true,
      arrowRef: null,
      disablePortal: false,
      flip: true,
      open: false,
      preventOverflow: "scrollParent",
      DownloadPopper: false,
      MoreHorizOpen: false,
      DownluadCSVOpen: false
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleMoreHorizClickButton = this.handleMoreHorizClickButton.bind(
      this
    );
    this.getProductList = this.getProductList.bind(this);
    this.openProductAddingModal = this.openProductAddingModal.bind(this);
    this.closeProductAddingModal = this.closeProductAddingModal.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
    this.bulkEditOn = this.bulkEditOn.bind(this);
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
  bulkEditOn = () => {
    this.handleMoreHorizClickButton();
    this.props.dispatch(BulkEditProduct(true));
  };
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

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  handleChangeTarget = key => event => {
    this.setState({
      [key]: event.target.value
    });
  };

  handleMoreHorizClickButton = () => {
    this.setState(state => ({
      MoreHorizOpen: !state.MoreHorizOpen
    }));
  };
  handleDownloadCSVClickButton = () => {
    this.setState(state => ({
      DownluadCSVOpen: !state.DownluadCSVOpen
    }));
  };
  handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };
  downloadCSV = () => {
    let token = localStorage.getItem("userToken");
    let products = {
      products: this.props.catalogueStates.products.data
    };

    let uri = getApiCredentials.host + "/api/products/export";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/csv",

        Authorization: "Bearer " + token
      },
      body: JSON.stringify(products)
    };
    const reqInstance = new Request(uri, requestOptions);
    return fetch(reqInstance)
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
      })
      .then(data => {
        const href = window.URL.createObjectURL(data);
        const a = document.createElement("a");
        a.download = "export.csv";
        a.href = href;
        a.click();
        a.href = "";
        return data;
      })
      .catch(err => console.log(err, "error111"));
  };
  centerScroll = ref => {
    if (!ref) {
      return;
    }

    const container = ref.parentElement;
    container.scrollTop = ref.clientHeight / 4;
    container.scrollLeft = ref.clientWidth / 4;
  };

  render() {
    const { classes, catalogueStates, products } = this.props;

    const {
      arrow,
      open,
      flip,
      preventOverflow,
      disablePortal,
      arrowRef
    } = this.state;

    const id = open ? "scroll-playground" : null;
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item>
            <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 500 }}>
              Catalogues
            </h2>
          </Grid>
          <Grid item>
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
              <span>Automate your processes by adding catalogues</span>
            </a>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="space-between">
              <Grid item>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 15,
                    marginBottom: 20
                  }}
                  ref={this.setWrapperRef}
                >
                  <IconButton
                    className={
                      classes.catalogActionButton +
                      (this.state.viewType === PRODUCT_VIEW_TYPE["col_view"]
                        ? " active"
                        : "")
                    }
                    onClick={() =>
                      this.changeProductView(PRODUCT_VIEW_TYPE["col_view"])
                    }
                    size="small"
                  >
                    <ViewModule />
                  </IconButton>
                  <IconButton
                    className={
                      classes.catalogActionButton +
                      (this.state.viewType === PRODUCT_VIEW_TYPE["grid_view"]
                        ? " active"
                        : "")
                    }
                    onClick={() =>
                      this.changeProductView(PRODUCT_VIEW_TYPE["grid_view"])
                    }
                    size="small"
                  >
                    <ViewList />
                  </IconButton>
                  <IconButton
                    className={
                      classes.catalogActionButton +
                      (this.state.activeBtn ===
                      CATALOGUE_CONTROL_BTN_TYPES["csv"]
                        ? " active"
                        : "")
                    }
                    size="small"
                    onClick={this.handleDownloadCSVClickButton}
                    buttonRef={node => {
                      this.ExportCSVButton = node;
                    }}
                  >
                    <VerticalAlignBottom />
                  </IconButton>
                  <Popper
                    open={this.state.DownluadCSVOpen}
                    anchorEl={this.ExportCSVButton}
                    placement="bottom-start"
                    disablePortal={disablePortal}
                    modifiers={{
                      flip: {
                        enabled: flip
                      }
                      /* arrow: {
                          enabled: arrow,
                          element: this.ExportCSVButton
                        },*/
                    }}
                  >
                    {arrow ? (
                      <span
                        className={classes.arrow}
                        ref={this.handleArrowRef}
                      />
                    ) : null}
                    <ClickAwayListener
                      onClickAway={this.handleDownloadCSVClickButton}
                    >
                      <Paper className={classes.paper}>
                        <MenuList>
                          <MenuItem
                            className={classes.menuItem}
                            onClick={this.downloadCSV}
                          >
                            <ListItemIcon className={classes.icon}>
                              <LibraryBooks />
                            </ListItemIcon>
                            <ListItemText
                              classes={{ primary: classes.primary }}
                              inset
                              primary="CSV"
                            />
                          </MenuItem>
                        </MenuList>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>

                  <IconButton
                    className={
                      classes.catalogActionButton +
                      (this.state.activeBtn ===
                      CATALOGUE_CONTROL_BTN_TYPES["import"]
                        ? " active"
                        : "")
                    }
                    size="small"
                    buttonRef={node => {
                      this.anchorEl = node;
                    }}
                    variant="contained"
                    onClick={this.handleMoreHorizClickButton}
                    aria-describedby={id}
                  >
                    <MoreHoriz />
                    {this.state.activeBtn ===
                      CATALOGUE_CONTROL_BTN_TYPES["import"]}
                  </IconButton>
                  <Popper
                    id={id}
                    open={this.state.MoreHorizOpen}
                    anchorEl={this.anchorEl}
                    placement="bottom-start"
                    disablePortal={disablePortal}
                    className={classes.popper}
                    modifiers={{
                      flip: {
                        enabled: flip
                      },
                      arrow: {
                        enabled: arrow,
                        element: arrowRef
                      },
                      preventOverflow: {
                        enabled: preventOverflow !== "disabled",
                        boundariesElement:
                          preventOverflow === "disabled"
                            ? "scrollParent"
                            : preventOverflow
                      }
                    }}
                  >
                    {arrow ? (
                      <span
                        className={classes.arrow}
                        ref={this.handleArrowRef}
                      />
                    ) : null}
                    <Paper className={classes.paper}>
                      <ClickAwayListener
                        onClickAway={this.handleMoreHorizClickButton}
                      >
                        <MenuList>
                          <MenuItem
                            className={classes.menuItem}
                            onClick={this.openProductAddingModal}
                          >
                            <ListItemIcon className={classes.icon}>
                              <Add />
                            </ListItemIcon>
                            <ListItemText
                              primaryTypographyProps={{
                                style: { textTransform: "capitalize" }
                              }}
                              classes={{ primary: classes.primary }}
                              inset
                              primary="add product"
                            />
                          </MenuItem>
                          <MenuItem className={classes.menuItem}>
                            <Link to="/import" className={classes.importHref}>
                              <ListItemIcon className={classes.icon}>
                                <OpenInBrowser />
                              </ListItemIcon>

                              <ListItemText
                                primaryTypographyProps={{
                                  style: { textTransform: "capitalize" }
                                }}
                                classes={{ primary: classes.primary }}
                                inset
                                primary="import"
                              />
                            </Link>
                          </MenuItem>
                          <MenuItem
                            className={classes.menuItem}
                            onClick={this.bulkEditOn}
                          >
                            <ListItemIcon className={classes.icon}>
                              <Edit />
                            </ListItemIcon>
                            <ListItemText
                              primaryTypographyProps={{
                                style: { textTransform: "capitalize" }
                              }}
                              classes={{ primary: classes.primary }}
                              inset
                              primary="bulk edit"
                            />
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Popper>
                </div>
              </Grid>
              <Grid item>{!catalogueStates.bulkEdit ? <Filter /> : null}</Grid>
            </Grid>
            <FilterBar />
          </Grid>
          <Dialog
            fullWidth={true}
            maxWidth="md"
            open={this.state.productAddingModal}
            classes={{ root: classes.dialogRoot }}
            onClose={this.closeProductAddingModal}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
          >
            <DialogTitle id="scroll-dialog-title">
              <div>
                <header className={classes.modalHeader}>
                  <Grid container justify="space-between" spacing={16}>
                    <Grid item>
                      <h3 className={classes.modalTitle}>
                        Add product information
                      </h3>
                      <p className={classes.modalDescription}>
                        Provide the following information to add a product
                      </p>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        <Close onClick={this.closeProductAddingModal} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </header>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <AddProduct closeModal={this.closeProductAddingModal} />
              </DialogContentText>
            </DialogContent>
            <DialogActions />
          </Dialog>

          <div className={classes.CatalogueBody}>
            <div className="shared-scroll-view">
              <div className="catalogue-grid">
                {catalogueStates["bulkEdit"] && <BulkEdit />}
                <div
                  className={`catalogue-item-wrapper ${this.state.viewType}`}
                >
                  <Grid container spacing={16}>
                    {!products["data"] ? (
                      <Loader />
                    ) : (
                      products["data"].map((item, index) => (
                        <SimpleProduct
                          key={index}
                          simpleProduct={item}
                          viewType={this.state.viewType}
                          bulkEdit={catalogueStates["bulkEdit"]}
                        />
                      ))
                    )}
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>
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
