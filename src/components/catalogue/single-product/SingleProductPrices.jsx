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
    this.state = {};
  }
  componentDidMount() {
    var services = this.props.product.services;
    this.setState({
      services: services
    });
  }
  render() {
    const { classes, product } = this.props;

    if (!this.state.services) return <div />;
    var services = this.state.services;
    console.log(services);
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Quantity Brackets</TableCell>

              {services &&
                services.map((val, key) => (
                  <TableCell key={key}>{val.minimum_order_quantity}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {services &&
              services.map((val, key) => {
                val &&
                  val.break_points.map((bp, bpk) => (
                    <TableRow key={bpk + 1000}>
                      <TableCell>{bp.color}</TableCell>
                      <TableCell>{bp.price}</TableCell>
                    </TableRow>
                  ));
              })}
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
