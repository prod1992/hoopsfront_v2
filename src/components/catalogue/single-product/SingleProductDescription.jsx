import React from "react";

import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import {
  Grid,
  Button,
  Chip,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Table
} from "@material-ui/core";
import RenderDialog from "../../shared/RenderDialog";
import classNames from "classnames";
import EditProductDescription from "./EditProductDescription";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    // minWidth: 700
  },
  tagStyles: {
    padding: "0 3px",
    fontSize: "0.75rem",
    marginLeft: "5px",
    borderRadius: 100,
    height: 22,
    fontFamily: "inherit",
    "&:not([variant='outlined'])": {
      //backgroundColor: "#e9e9e9"
    }
  },
  DescriptionTitle: {
    display: "flex",
    alignItems: "center"
  },
  blueRow: {
    backgroundColor: "#EEF3F7"
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

  iconSmall: {
    fontSize: 14
  }
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

class SingleProductDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.setNewProduct = this.setNewProduct.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  setNewProduct(data) {
    if (data.size) data.size = data.size.split(",");
    if (data.colour) data.colour = data.colour.split(",");
    if (data.tags) data.tags = data.tags.split(",");

    this.setState({
      product: data
    });
  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    const { classes } = this.props;
    const { product } = this.props;

    return (
      <div>
        <RenderDialog
          oppen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          ModalTitle={"Edit product detail"}
          modalDescription={
            "Provide the following information to edit product detail"
          }
          context={
            <EditProductDescription
              setNewProduct={this.setNewProduct}
              closeModal={this.closeModal}
              productData={product}
            />
          }
        />
        <Grid container>
          <Grid
            container
            spacing={16}
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Grid className={classes.DescriptionTitle}>
              <h1>Example T-Shirt</h1>
              <Chip
                className={classes.tagStyles}
                variant="outlined"
                color="primary"
                label={"Id: " + product.code}
              />
            </Grid>
            <Grid>
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.editButton}
                onClick={this.openModal}
              >
                <EditIcon
                  className={classNames(classes.leftIcon, classes.iconSmall)}
                />
                Edit
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={16}>
            <p style={{ display: "block" }}>
              This is the example t-shirt. Delete this product at any time.
              200gsm Available in 20 Colours & 5 Sizes. Check out the different
              prices for each size/colour combination.
            </p>
          </Grid>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Paper>
                <Table className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell>Primary Price Description</TableCell>
                      <TableCell align="right">
                        {product.primary_price_description}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.blueRow}>
                      <TableCell>Brand</TableCell>
                      <TableCell align="right">{product.brand}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vendor</TableCell>
                      <TableCell align="right">N/A</TableCell>
                    </TableRow>
                    <TableRow className={classes.blueRow}>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">{product.category}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Min order Qty</TableCell>
                      <TableCell align="right">N/A</TableCell>
                    </TableRow>
                    <TableRow className={classes.blueRow}>
                      <TableCell>Print Area</TableCell>
                      <TableCell align="right">N/A</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Stock/Indent</TableCell>
                      <TableCell align="right">{product.stock}</TableCell>
                    </TableRow>
                    <TableRow className={classes.blueRow}>
                      <TableCell>Standard Production Time</TableCell>
                      <TableCell align="right">
                        {product.standard_production_time}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Decoration Areas</TableCell>
                      <TableCell align="right">
                        {product.decoration_areas}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Table className={classes.table}>
                  <TableBody>
                    <TableRow>
                      <TableCell>Carton Size</TableCell>
                      <TableCell align="right">
                        H:{product.carton_height} | W:{product.carton_width} |
                        D:
                        {product.carton_length}{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.blueRow}>
                      <TableCell>Carton Weight</TableCell>
                      <TableCell align="right">
                        {product.carton_weight}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Carton Qty</TableCell>
                      <TableCell align="right">N/A</TableCell>
                    </TableRow>
                    <TableRow className={classes.blueRow}>
                      <TableCell>Carton Cubic</TableCell>
                      <TableCell align="right">
                        {product.carton_cubic}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Carton Notes</TableCell>
                      <TableCell align="right">
                        {product.carton_notes}
                      </TableCell>
                    </TableRow>
                    <TableRow className={classes.blueRow}>
                      <TableCell>Freight Description</TableCell>
                      <TableCell align="right">
                        {product.freight_description}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Individual Product Packaging</TableCell>
                      <TableCell align="right">
                        {product.standard_production_time}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SingleProductDescription);
