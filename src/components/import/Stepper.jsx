import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ProductInfo from "../import/product-info";
import ShippingInfo from "../import/shipping-info";
import Pricing from "../import/pricing";
import AdditionalCost from "../import/additional-cost";
import PreviewImport from "../import/preview-import";

const styles = theme => ({
  root: {
    width: "90%"
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

const getStepContent = step => props => {
  switch (step) {
    case 0:
      return (
        <ProductInfo importFileData={this.props.importFileData.importData} />
      );
    case 1:
      return (
        <ShippingInfo importFileData={this.props.importFileData.importData} />
      );
    case 2:
      return <Pricing importFileData={this.props.importFileData.importData} />;
    case 3:
      return (
        <AdditionalCost importFileData={this.props.importFileData.importData} />
      );
    case 4:
      return (
        <PreviewImport importFileData={this.props.importFileData.importData} />
      );
    default:
      return "Unknown step";
  }
};

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
    const { activeStep } = this.state;
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

    return (
      <div className={classes.root}>
        <Stepper alternativeLabel activeStep={activeStep} connector={connector}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

CustomizedStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(CustomizedStepper);
