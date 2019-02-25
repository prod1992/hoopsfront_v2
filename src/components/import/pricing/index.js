import ImportStateChart from "../../../components/import/shared/state-chart";
import StepButtons from "../shared/step-buttons";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import RenderLabelGroup from "../../shared/RenderLabelGroup";

import ImportedProperty from "../../../containers/imported-property";
import WatchVideoButton from "../../WatchVideoButton";
import TrendingFlat from "@material-ui/icons/TrendingFlat";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import Beenhere from "@material-ui/icons/Beenhere";

import {
  FormControlLabel,
  Radio,
  Paper,
  Grid,
  Fab,
  Button,
  Chip
} from "@material-ui/core";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    padding: 16,
    fontSize: 14
  }
});

class Pricing extends Component {
  constructor(props) {
    super(props);
    this.setAdditionalFields = this.setAdditionalFields.bind(this);
    this.addMoreService = this.addMoreService.bind(this);
    this.addMorePriceBreaks = this.addMorePriceBreaks.bind(this);
    this.state = {
      showAdditionalFields: false,
      serviceCount: 1,
      priceBreaksCount: 1,
      additionalField: 0
    };
  }

  setAdditionalFields(e) {
    const value = e.target.value;
    console.log(value);
    if (this.state.additionalField !== value) {
      this.setState({
        showAdditionalFields: true,
        additionalField: parseInt(value)
      });
    }
  }

  addMorePriceBreaks() {
    const { priceBreaksCount } = this.state;
    this.setState({
      priceBreaksCount: priceBreaksCount + 1
    });
  }

  removePriceBreaks() {
    const { priceBreaksCount } = this.state;
    this.setState({
      priceBreaksCount: priceBreaksCount - 1
    });
  }

  addMoreService() {
    const { serviceCount } = this.state;
    this.setState({
      serviceCount: serviceCount + 1
    });
  }

  getService() {
    const { importFileData } = this.props;
    return (
      importFileData &&
      importFileData.db_fields.map((item, index) => {
        if (index === 26) {
          return (
            <tr key={index}>
              <td>
                <span>{item.label}</span>
                {item.required && (
                  <button className="hoops_map_table_required_button">
                    Required
                  </button>
                )}
                {item.recomended && (
                  <button className="hoops_map_table_recommended_button">
                    Recommended
                  </button>
                )}
                <a
                  href="http://help.hoopscrm.com/catalog/import-field-explanations/service-names"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="what_this_link"
                >
                  What's This?
                </a>
              </td>
              <td>
                <TrendingFlat />
              </td>
              <td>
                <ImportedProperty
                  propertyItem={item}
                  propertyOptions={importFileData.csv_headers}
                />
              </td>
            </tr>
          );
        }
      })
    );
  }

  getServiceArray() {
    const { serviceCount } = this.state;
    let service = [];
    for (let i = 0; i < serviceCount; i++) {
      const singleRow = this.getService();
      service.push(singleRow);
    }
    return service;
  }

  getPriceBreak(i) {
    const { importFileData } = this.props;
    return (
      <div className="quantity_break_block" key={i}>
        <div className="quantity_break_block_content">
          <div className="quantity_break_block_items">
            <div className="minimum_order_block_title">
              <RenderLabelGroup
                text={"Quantity break point " + i}
                url={
                  "http://help.hoopscrm.com/catalog/import-field-explanations/moq-price-breaks"
                }
                priority={"Required"}
                anchorText={"What's This?"}
              />
            </div>
            <ImportedProperty
              propertyItem={{ name: `quantity_break_point_${i}` }}
              propertyOptions={importFileData.csv_headers}
            />
          </div>
          <div className="quantity_break_block_items">
            <div className="minimum_order_block_title">
              <RenderLabelGroup
                text={"Quantity break point " + i + " price"}
                url={
                  "http://help.hoopscrm.com/catalog/import-field-explanations/moq-price-breaks"
                }
                priority={"Required"}
                anchorText={"What's This?"}
              />
            </div>
            <ImportedProperty
              propertyItem={{ name: `quantity_break_point_${i}_price` }}
              propertyOptions={importFileData.csv_headers}
            />
          </div>
          {i > 1 && (
            <div className="remove-price-break">
              <Fab onClick={() => this.removePriceBreaks(i)}>
                <RemoveCircle />
              </Fab>
            </div>
          )}
        </div>
      </div>
    );
  }

  getPriceBreakArray() {
    const { priceBreaksCount } = this.state;
    let priceRows = [];
    for (let i = 0; i < priceBreaksCount; i++) {
      const singleRow = this.getPriceBreak(i + 1);
      priceRows.push(singleRow);
    }
    return priceRows;
  }

  render() {
    const { importFileData, classes } = this.props;
    const {
      showAdditionalFields,
      additionalField,
      priceBreaksCount,
      serviceCount
    } = this.state;

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
          {additionalField !== 2 && (
            <div className="step_3_catalogue_multiple">
              <div className="step_3_catalogue_multiple_content">
                <div className="step_3_catalogue_multiple_items">
                  <div className="step_3_catalogue_title">
                    <RenderLabelGroup
                      text={
                        "Does this catalogue have multiple service options?"
                      }
                      url={
                        "http://help.hoopscrm.com/catalog/import-field-explanations/service-options"
                      }
                      anchorText={"What's This?"}
                    />
                  </div>
                  <p className="standard_product_step_3">
                    Eg. Standard Production, Rush Service, Indent etc
                  </p>
                </div>
                <div className="step_3_catalogue_multiple_items">
                  <FormControlLabel
                    value={1}
                    control={<Radio color="primary" />}
                    onClick={this.setAdditionalFields}
                    label="Yes"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio color="primary" />}
                    onClick={this.setAdditionalFields}
                    label="No"
                    labelPlacement="end"
                  />
                </div>
              </div>
            </div>
          )}
          {showAdditionalFields && additionalField === 1 && (
            <div className="hoops_map_table step_3">
              <table className="hoops_map_table_in_table">
                <thead>
                  <tr>
                    <td>
                      <span>Map to fields in Hoops</span>
                    </td>
                    <td />
                    <td>
                      <span>Fields in your file</span>
                    </td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  {this.getServiceArray().map(service => service)}
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td>
                      <button onClick={this.addMoreService}>Add More</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {showAdditionalFields && additionalField === 2 && (
            <div className="hoops_map_table step_3">
              <div className="minimum_order_block">
                <div className="minimum_order_block_content">
                  <div className="minimum_order_block_title">
                    <RenderLabelGroup
                      text={"Minimum Order Quantity"}
                      url={
                        "http://help.hoopscrm.com/catalog/import-field-explanations/moq-price-breaks"
                      }
                      anchorText={"What's This?"}
                    />
                  </div>
                  <ImportedProperty
                    propertyItem={{ name: "min_order_quantity" }}
                    propertyOptions={importFileData.csv_headers}
                  />
                </div>
              </div>
              {this.getPriceBreakArray().map(item => item)}
              <div className="add_more_breaks">
                <Button
                  variant="outlined"
                  color="inherit"
                  className={classes.button}
                  onClick={this.addMorePriceBreaks}
                >
                  Add More Price Breaks
                </Button>
              </div>
            </div>
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Pricing);
