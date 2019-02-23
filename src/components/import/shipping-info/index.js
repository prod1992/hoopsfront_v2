import ImportStateChart from "../../../components/import/shared/state-chart";
import StepButtons from "../shared/step-buttons";
import React, { Component } from "react";
import ImportedProperty from "../../../containers/imported-property";
import VideoBtn from "../../shared/WatchVideoButton";
import { withStyles } from "@material-ui/core/styles";

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
import TrendingFlat from "@material-ui/icons/TrendingFlat";
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

class ShippingInfo extends Component {
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
      <div className="product_mapping_block">
        <Paper>
          <Grid container className="product_mapping_block_title">
            <Grid item>
              <div className="product_info_icon_block">
                <Beenhere />
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
                  <span>Map to fields in Hoops</span>
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
                  if (index >= 13 && index < 25) {
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

export default withStyles(styles, { withTheme: true })(ShippingInfo);
