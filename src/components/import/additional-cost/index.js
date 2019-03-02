import React from "react";
import ImportedProperty from "../../../containers/imported-property";
import WatchVideoButton from "../../WatchVideoButton";
import Beenhere from "@material-ui/icons/Beenhere";
// import AddVendor from "../shared/add-vendor";
import { withStyles } from "@material-ui/core/styles";

import {
  FormControlLabel,
  Radio,
  Paper,
  Grid,
  Button,
  RadioGroup,
  Chip
} from "@material-ui/core";
import RenderLabelGroup from "../../shared/RenderLabelGroup";
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    padding: 16,
    fontSize: 14
  }
});
class AdditionalCost extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAdditionalBlock = this.toggleAdditionalBlock.bind(this);
    this.addMoreAdditionalBlock = this.addMoreAdditionalBlock.bind(this);
    this.addMorePriceBreaks = this.addMorePriceBreaks.bind(this);
    this.state = {
      showAdditionalBlock: false,
      additionalBlockCount: 1,
      priceBreaksCount: [1]
    };
  }

  toggleAdditionalBlock(e) {
    const value = e.target.value;
    if (value == 1) {
      this.setState({
        showAdditionalBlock: true
      });
    } else {
      this.setState({
        showAdditionalBlock: false
      });
    }
  }

  addMorePriceBreaks(index) {
    this.setState(prevState => {
      const breaksCount = [].concat(prevState.priceBreaksCount);
      breaksCount[index] ? (breaksCount[index] += 1) : (breaksCount[index] = 1);
      return { priceBreaksCount: breaksCount };
    });
  }

  addMoreAdditionalBlock() {
    this.setState(prevState => {
      const { additionalBlockCount, priceBreaksCount } = prevState;
      const newPriceBreaksCount = [].concat(priceBreaksCount);
      newPriceBreaksCount.push(1);
      return {
        additionalBlockCount: additionalBlockCount + 1,
        priceBreaksCount: newPriceBreaksCount
      };
    });
  }

  getAdditionalBlock(i) {
    const { importFileData, classes } = this.props;

    return (
      <div className="additional_cost_block" key={i + 1000}>
        <div className="additional_cost_title_block">
          <div className="Additional_cost_name">
            <h3>Additional cost {i + 1}</h3>
          </div>
          <div className="minus_block" />
        </div>
        <div className="step_4_description">
          <div className="description_items">
            <div className="minimum_order_block_title">
              <RenderLabelGroup
                text={"Description"}
                url={
                  "http://help.hoopscrm.com/catalog/import-field-explanations/service-options"
                }
                priority={"required"}
                anchorText={"What's This?"}
              />
            </div>
            <ImportedProperty
              propertyItem={{ name: `description` }}
              propertyOptions={importFileData.csv_headers}
            />
          </div>
          <div className="description_items">
            <div className="minimum_order_block_title">
              <RenderLabelGroup
                text={"Notes"}
                url={
                  "http://help.hoopscrm.com/catalog/import-field-explanations/service-options"
                }
                anchorText={"What's This?"}
              />
            </div>
            <ImportedProperty
              propertyItem={{ name: `notes` }}
              propertyOptions={importFileData.csv_headers}
            />
          </div>
          <div className="description_items">
            <div className="minimum_order_block_title">
              <RenderLabelGroup
                text={"Setup Cost"}
                url={
                  "http://help.hoopscrm.com/catalog/import-field-explanations/service-options"
                }
                anchorText={"What's This?"}
              />
            </div>
            <ImportedProperty
              propertyItem={{ name: `setup_cost` }}
              propertyOptions={importFileData.csv_headers}
            />
          </div>
        </div>
        {this.getPriceBreakArray(i).map(item => item)}
        <div className="add_more_breaks">
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => this.addMorePriceBreaks(i)}
            className={classes.button}
          >
            Add More Price Breaks
          </Button>
        </div>
      </div>
    );
  }

  getAdditionalBlockArray() {
    const { additionalBlockCount } = this.state;
    let service = [];
    for (let i = 0; i < additionalBlockCount; i++) {
      const singleRow = this.getAdditionalBlock(i);
      service.push(singleRow);
    }
    return service;
  }
  getPriceBreak(i) {
    const { importFileData, classes } = this.props;
    return (
      <Paper key={i + 100}>
        <div className="quantity_break_block_content">
          <div className="quantity_break_block_items">
            <div className="minimum_order_block_title">
              <RenderLabelGroup
                text={"Quantity break point " + i}
                url={
                  "http://help.hoopscrm.com/catalog/import-field-explanations/service-options"
                }
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
                  "http://help.hoopscrm.com/catalog/import-field-explanations/service-options"
                }
                anchorText={"What's This?"}
              />
            </div>
            <ImportedProperty
              propertyItem={{ name: `quantity_break_point_${i}_price` }}
              propertyOptions={importFileData.csv_headers}
            />
          </div>
        </div>
      </Paper>
    );
  }

  getPriceBreakArray(index) {
    const { priceBreaksCount } = this.state;
    let priceRows = [];
    for (let i = 0; i < priceBreaksCount[index]; i++) {
      const singleRow = this.getPriceBreak(i + 1);
      priceRows.push(singleRow);
    }
    return priceRows;
  }

  render() {
    const { classes } = this.props;
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
                <span>Services price mapping</span>
              </h4>
            </Grid>
            <Grid item>
              <div>
                <WatchVideoButton />
              </div>
            </Grid>
          </Grid>
          <Paper>
            <Paper>
              <Grid container>
                <Grid item>
                  <RenderLabelGroup
                    text={"Does this catalogue have multiple service options?"}
                    url={
                      "http://help.hoopscrm.com/catalog/import-field-explanations/service-options"
                    }
                    anchorText={"What's This?"}
                  />
                  <p>Eg. Standard Production, Rush Service, Indent etc</p>
                </Grid>
                <Grid item>
                  <RadioGroup>
                    <FormControlLabel
                      value={1}
                      control={<Radio color="primary" />}
                      onClick={this.toggleAdditionalBlock}
                      label="Yes"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio color="primary" />}
                      onClick={this.toggleAdditionalBlock}
                      label="No"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Paper>

            {this.state.showAdditionalBlock && (
              <div>
                {this.getAdditionalBlockArray().map(item => item)}
                <div className="add_more_breaks">
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={this.addMoreAdditionalBlock}
                    className={classes.button}
                  >
                    Add More Additional Cost
                  </Button>
                </div>
              </div>
            )}
          </Paper>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AdditionalCost);
