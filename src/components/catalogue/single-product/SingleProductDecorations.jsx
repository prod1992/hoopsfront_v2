import React from "react";
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

function SingleProductDescription(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Primary Price Description</TableCell>
              <TableCell align="right">N/A</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell align="right">N/A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vendor</TableCell>
              <TableCell align="right">N/A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">N/A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Min order Qty</TableCell>
              <TableCell align="right">N/A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Print Area</TableCell>
              <TableCell align="right">N/A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Stock/Indent</TableCell>
              <TableCell align="right">N/A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Standard Production Time</TableCell>
              <TableCell align="right">N/A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Decoration Areas</TableCell>
              <TableCell align="right">N/A</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

SingleProductDescription.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SingleProductDescription);
