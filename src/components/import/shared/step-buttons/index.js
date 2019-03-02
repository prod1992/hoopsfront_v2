import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  moveNextStep,
  movePrevStep
} from "../../../../actions/catalogue-actions";
import { onUpload, onFinish } from "../../../../core/import";

//import { Modal } from "../../../modal/modal";
import { ToastContainer, toast } from "react-toastify";
import { KeyboardBackspace, SkipNext } from "@material-ui/icons";
import {
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepConnector
} from "@material-ui/core";

const styles = theme => ({
  uploadControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonStyles: {
    borderRadius: "2px",
    height: 42,
    padding: "0 15px",
    fontSize: ".935rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: 100,
    boxShadow: "none"
  },
  stepButtons: {
    marginTop: "15px"
  }
});

const ArrowLeft = props => {
  return <KeyboardBackspace {...props} />;
};

const ArrowRight = props => {
  return (
    <KeyboardBackspace {...props} style={{ transform: "rotate(180deg)" }} />
  );
};

class StepButtons extends React.Component {
  constructor(props) {
    super(props);
    this.renderSkipButton = this.renderSkipButton.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.changeNextStep = this.changeNextStep.bind(this);
    this.changePrevStep = this.changePrevStep.bind(this);
  }

  notifyOnEmptyFields(message) {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  upload() {
    console.log("Upload");
  }

  changePrevStep() {
    this.props.movePrevStep();
  }

  changeNextStep() {
    const { csv, importData, properties } = this.props.importCatalogFiles;
    const { stepState } = this.props.importSteps;
    if (csv === true) {
      if (stepState === 0) {
        const vendor = this.props.selectVendor.selected.single;
        if (vendor) {
          this.props.formData.delete("vendor");
          this.props.formData.append("vendor", vendor.value);
          this.props.onUpload(this.props.formData);
        } else {
          this.notifyOnEmptyFields("Please, select a vendor!");
        }
      } else if (stepState === 1 || stepState === 2) {
        let namesOfRequired = importData.db_fields
          .filter(m => m.required)
          .map(item => item.name);
        let selectedProps = properties.map(item => Object.values(item)[0]);
        let unInsertedPropsCount = 0;
        namesOfRequired.forEach(item => {
          if (!selectedProps.includes(item)) {
            unInsertedPropsCount++;
          }
        });
        if (unInsertedPropsCount === 0) {
          this.props.moveNextStep();
        } else {
          this.notifyOnEmptyFields("Please, select required fields!");
        }
      } else if (stepState === 4) {
        console.log(this.props);
        const {
          properties,
          importData: { csv }
        } = this.props.importCatalogFiles;
        const formData = new FormData();
        formData.append("csv", csv);
        formData.append("fields", JSON.stringify(properties));
        this.props.onFinish(formData);
      } else {
        this.props.moveNextStep();
      }
    } else {
      this.notifyOnEmptyFields("Please, select an csv file!");
    }
  }

  renderSkipButton(param) {
    const { classes } = this.props;
    if (param === 0 || param === 5 || param === 1) {
      return (
        <Button
          variant="contained"
          color="primary"
          className="disabled"
          onClick={this.changeNextStep}
          disabled
        >
          <span>Skip</span>
          <SkipNext />{" "}
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonStyles}
          onClick={this.changeNextStep}
        >
          <span>Skip</span>
          <SkipNext />{" "}
        </Button>
      );
    }
  }

  renderNextButton(param) {
    const { classes } = this.props;

    if (param === 5) {
      return (
        <Button
          onClick={this.changeNextStep}
          className={classes.buttonStyles}
          disabled
        >
          Next
          <ArrowRight />
        </Button>
      );
    } else {
      return (
        <Button
          className={classes.buttonStyles}
          variant="contained"
          color="primary"
          onClick={this.changeNextStep}
          style={{ textTransform: "capitalize" }}
        >
          Next
          <ArrowRight />
        </Button>
      );
    }
  }

  render() {
    const { classes } = this.props;
    const stepData = this.props.importSteps;
    /*if (this.props.importCatalogFiles.error) {
      <Modal>{this.props.importCatalogFiles.error}</Modal>;
    }
    */
    return (
      <Grid container className={classes.stepButtons}>
        <ToastContainer
          position="top-right"
          autoClose={false}
          newestOnTop
          closeOnClick
          rtl
          pauseOnVisibilityChange
          draggable
        />
        <Grid container className={classes.uploadControls}>
          {!this.props.firstPage && (
            <div style={{ marginRight: "auto" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.changePrevStep}
                className={stepData["stepState"] === 0 ? "disabled" : ""}
              >
                <ArrowLeft />

                <span>Back</span>
              </Button>
            </div>
          )}
          <Grid container spacing={16}>
            {!this.props.firstPage &&
              this.renderSkipButton(stepData["stepState"])}
            {this.renderNextButton(stepData["stepState"])}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    importSteps: state.importStepsReducer,
    importCatalogFiles: state.importCatalogFiles,
    selectVendor: state.selectVendor
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onUpload: formData => {
      dispatch(onUpload(formData));
    },
    onFinish: data => {
      dispatch(onFinish(data));
    },
    moveNextStep: () => {
      dispatch(moveNextStep);
    },
    movePrevStep: () => {
      dispatch(movePrevStep);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StepButtons));
