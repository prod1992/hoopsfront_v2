import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class SingleProductPrices extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
    var services = this.props.product.services;
    console.log(services);
    services.map((val, key) => {
      //services[key].break_points = JSON.parse(services[key].break_points);
      console.log(services[key].break_points);
    });
    console.log(services);
  }
  render() {
    const { classes, product } = this.props;
    if (!product.services) return <div />;

    product.services.break_points = product.services.break_points
      ? JSON.parse(product.services.break_points)
      : null;
    console.log(product.services.break_points);
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Quantity Brackets</TableCell>

              {product.services &&
                product.services.map((val, key) => (
                  <TableCell key={key}>{val.minimum_order_quantity}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {product.services &&
              product.services.map((val, key) => (
                <TableCell key={key}>{val.minimum_order_quantity}</TableCell>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SingleProductPrices.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleProductPrices);
