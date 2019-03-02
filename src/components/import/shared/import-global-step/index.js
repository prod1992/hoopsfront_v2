import React from "react";
import { connect } from "react-redux";
import CloudUpload from "@material-ui/icons/CloudUpload";
import RemoveRedEye from "@material-ui/icons/RemoveRedEye";
import OpenInBrowser from "@material-ui/icons/OpenInBrowser";
class GlobalStep extends React.Component {
  constructor(props) {
    super(props);
    this.renderCommonBtn = this.renderCommonBtn.bind(this);
  }

  renderCommonBtn(param) {
    if (param !== 0 && param !== 5) {
      return (
        <div className="item active">
          <RemoveRedEye />
          <span>Map and preview</span>
        </div>
      );
    } else {
      return (
        <div className="item">
          <RemoveRedEye />
          <span>Map and preview</span>
        </div>
      );
    }
  }

  render() {
    const stepData = this.props.importStep;
    return (
      <div className="bottom-state-footer">
        <div className={stepData["stepState"] === 0 ? "item active" : "item"}>
          <CloudUpload />
          <span>Upload File</span>
        </div>
        {this.renderCommonBtn(stepData["stepState"])}
        <div className={stepData["stepState"] === 5 ? "item active" : "item"}>
          <OpenInBrowser />
          <span>Import</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    importStep: state.importStepsReducer
  };
}

export default connect(mapStateToProps)(GlobalStep);
