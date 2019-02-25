import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ImportedProperty from "../../../containers/imported-property";
import VideoBtn from "../../WatchVideoButton";
import TrendingFlat from "@material-ui/icons/TrendingFlat";

import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper,
  Grid
} from "@material-ui/core";
import Beenhere from "@material-ui/icons/Beenhere";
import RenderLabelGroup from "../../shared/RenderLabelGroup";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  table: {
    tableLayout: "fixed"
  }
});

class ProductInfo extends React.Component {
  render() {
    const { classes, importFileData } = this.props;
    const getPriority = item => {
      if (item.required) {
        return "required";
      }
      if (item.recomended) {
        return "recomended";
      } else {
        return "";
      }
    };
    return (
      <Paper className={classes.root}>
        <Grid container spacing={16} justify="space-between">
          <Grid item>
            <div>
              <Beenhere />
              <span>Product info mapping</span>
            </div>
          </Grid>
          <Grid item>
            <div>
              <VideoBtn />
            </div>
          </Grid>
        </Grid>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell alignCenter style={{ color: "inherit" }}>
                <b>Map to fields in </b>
              </TableCell>
              <TableCell />
              <TableCell alignCenter style={{ color: "inherit" }}>
                <b>Fields in your file</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {importFileData &&
              importFileData.db_fields.map((item, index) => {
                if (index < 13) {
                  return (
                    <TableRow key={index}>
                      <TableCell alignCenter>
                        <RenderLabelGroup
                          text={item.label}
                          url={"#"}
                          priority={getPriority(item)}
                          anchorText={"What's this?"}
                        />
                      </TableCell>
                      <TableCell alignCenter>
                        <TrendingFlat />
                      </TableCell>
                      <TableCell alignCenter>
                        <ImportedProperty
                          propertyItem={item}
                          propertyOptions={importFileData.csv_headers}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    // selectVendor: state.selectVendor,
    // importSteps: state.importStepsReducer,
    // importFiles: state.importCatalogFiles,
    // progress: state.importCatalogFiles.progress
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(ProductInfo)
);
