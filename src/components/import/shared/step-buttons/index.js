import {
  moveNextStep,
  movePrevStep
} from "../../../../actions/catalogue-actions";
import { onUpload, onFinish } from "../../../../core/import";
import React, { Component } from "react";
import { connect } from "react-redux";
//import { Modal } from "../../../modal/modal";
import { ToastContainer, toast } from "react-toastify";
import TrendingFlat from "@material-ui/icons/TrendingFlat";

class StepButtons extends Component {
  constructor(props) {
    super(props);
    this.renderSkipButton = this.renderSkipButton.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.changeNextStep = this.changeNextStep.bind(this);
    this.changePrevStep = this.changePrevStep.bind(this);
  }

  componentDidMount(prevProps) {}

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
        const vendor = this.props.selectVendor.selected;
        if (vendor) {
          this.props.formData.delete("vendor");
          this.props.formData.append("vendor", vendor.id);
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
    if (param === 0 || param === 5) {
      return (
        <button className="disabled" onClick={this.changeNextStep} disabled>
          <span>Skip</span>
          <i className="material-icons">skip_next</i>
        </button>
      );
    } else {
      return (
        <button onClick={this.changeNextStep}>
          <span>Skip</span>
          <i className="material-icons">skip_next</i>
        </button>
      );
    }
  }

  renderNextButton(param) {
    if (param === 5) {
      return (
        <button
          onClick={this.changeNextStep}
          className="next disabled"
          disabled
        >
          <span>Next</span>
          <TrendingFlat />
        </button>
      );
    } else {
      return (
        <button onClick={this.changeNextStep} className="next">
          <span>Next</span>
          <TrendingFlat />
        </button>
      );
    }
  }

  render() {
    const stepData = this.props.importSteps;
    /*if (this.props.importCatalogFiles.error) {
      <Modal>{this.props.importCatalogFiles.error}</Modal>;
    }
    */
    return (
      <div className="next-prev-control">
        <ToastContainer autoClose={2000} />
        {!this.props.firstPage && (
          <div className="left-side">
            <button
              onClick={this.changePrevStep}
              className={stepData["stepState"] === 0 ? "disabled" : ""}
            >
              <TrendingFlat />

              <span>Back</span>
            </button>
          </div>
        )}

        <div className="right-side">
          {!this.props.firstPage &&
            this.renderSkipButton(stepData["stepState"])}
          {this.renderNextButton(stepData["stepState"])}
        </div>
      </div>
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
)(StepButtons);
