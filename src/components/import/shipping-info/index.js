import ImportStateChart from "../../../components/import/shared/state-chart";
import StepButtons from "../shared/step-buttons";
import React, { Component } from "react";
import ImportedProperty from "../../../containers/imported-property";
import WatchVideoButton from "../../WatchVideoButton";
import { withStyles } from "@material-ui/core/styles";

import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper,
  Grid,
  Chip
} from "@material-ui/core";
import Beenhere from "@material-ui/icons/Beenhere";
import TrendingFlat from "@material-ui/icons/TrendingFlat";
import RenderLabelGroup from "../../shared/RenderLabelGroup";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    padding: 16,
    fontSize: 14
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
        <Paper className={classes.root}>
          <Grid
            container
            spacing={16}
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <h4 style={{ fontSize: "1.125rem", fontWeight: 400, margin: 0 }}>
                <Chip
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: "#f0ab5d",
                    color: "#FFFFFF",
                    marginRight: 10
                  }}
                  label={<Beenhere style={{ fontSize: "1.25rem" }} />}
                />
                <span>Product info mapping</span>
              </h4>
            </Grid>
            <Grid item>
              <WatchVideoButton />
            </Grid>
          </Grid>

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
