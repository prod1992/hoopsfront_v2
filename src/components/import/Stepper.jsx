import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import ProductInfo from "../import/product-info";
import ShippingInfo from "../import/shipping-info";
import Pricing from "../import/pricing";
import AdditionalCost from "../import/additional-cost";
import PreviewImport from "../import/preview-import";
import Paper from "@material-ui/core/Paper";
const styles = theme => ({
  root: {
    backgroundColor: "transparent"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  connectorActive: {
    "& $connectorLine": {
      borderColor: theme.palette.secondary.main
    }
  },
  connectorCompleted: {
    "& $connectorLine": {
      borderColor: theme.palette.primary.main
    }
  },
  connectorDisabled: {
    "& $connectorLine": {
      borderColor: theme.palette.grey[100]
    }
  },
  connectorLine: {
    transition: theme.transitions.create("border-color")
  }
});

function getSteps() {
  return [
    "Product Info",
    "Shipping info",
    "Pricing",
    "Additional Cost",
    "Preview and import"
  ];
}

class CustomizedStepper extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const connector = (
      <StepConnector
        classes={{
          active: classes.connectorActive,
          completed: classes.connectorCompleted,
          disabled: classes.connectorDisabled,
          line: classes.connectorLine
        }}
      />
    );
    const { importStep } = this.props;
    const activeStep = importStep.stepState;

    return (
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={connector}
        className={classes.root}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  }
}
function mapStateToProps(state) {
  return {
    importStep: state.importStepsReducer,
    importFileData: state.importCatalogFiles,
    selectedVendor: state.selectVendor.selected
  };
}

CustomizedStepper.propTypes = {
  classes: PropTypes.object
};
export default connect(mapStateToProps)(withStyles(styles)(CustomizedStepper));
