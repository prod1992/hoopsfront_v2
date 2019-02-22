import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ImportedProperty from "../../../containers/imported-property";
import VideoBtn from "../../shared/WatchVideoButton";
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

import RenderLabelGroup from "../../shared/RenderLabelGroup";

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

class ProductInfo extends React.Component {
  render() {
    const { classes, importFileData } = this.props;
    const getPriority = item => {
      console.log(item);
      if (item.required) {
        return "required";
      }
      if (item.recomended) {
        return "recomended";
      } else {
        return "";
      }
    };
    console.log(importFileData);
    return (
      <div className="product_mapping_block">
        <Paper>
          <Grid container className="product_mapping_block_title">
            <Grid item>
              <div className="product_info_icon_block">
                <i className="material-icons white-text product_info_icon_block_icon">
                  beenhere
                </i>
              </div>
              <span className="product_info_icon_block_text">
                Product info mapping
              </span>
            </Grid>
            <Grid item>
              <VideoBtn />
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <span>Map to fields in </span>
                </TableCell>
                <TableCell />
                <TableCell>
                  <span>Fields in your file</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {importFileData &&
                importFileData.db_fields.map((item, index) => {
                  if (index < 13) {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <RenderLabelGroup
                            text={item.label}
                            url={"#"}
                            priority={getPriority(item)}
                            anchorText={"What's this?"}
                          />
                        </TableCell>
                        <TableCell>
                          <TrendingFlat />
                        </TableCell>
                        <TableCell>
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
      </div>
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
