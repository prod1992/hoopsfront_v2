import GlobalStep from "../../components/import/shared/import-global-step";
import ImportStateChart from "../../components/import/shared/state-chart";
import AdditionalCoast from "../../components/import/additional-cost";
import StepButtons from "../../components/import/shared/step-buttons";
import PreviewImport from "../../components/import/preview-import";
import ShippingInfo from "../../components/import/shipping-info";
import UploadFiles from "../../components/import/data-mapping";
import ProductInfo from "../../components/import/product-info";
import Pricing from "../../components/import/pricing";
import { moveNextStep, movePrevStep } from "../../actions/catalogue-actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";

//import {onFinish, onUpload} from "../../service/catalog/import";
const styles = theme => ({});
class ImportPage extends Component {
  render() {
    const { importStep, importFileData, selectedVendor } = this.props;
    return (
      <div className="import-page-wrapper">
        <div className="shared-scroll-view">
          {importStep.stepState === 0 ? <UploadFiles /> : ""}
          {importStep.stepState !== 0 ? (
            <div className="step-shared-wrapper">
              <div className="main-header-control-wrapper">
                <div className="shared-header-control">
                  <StepButtons />
                  <ImportStateChart />
                </div>
                <div className="user-status-info">
                  <div className="info-wrapper">
                    <div className="col-sm-12 col-md-4 info-item">
                      <div className="text">Vendor</div>
                      <div className="content">
                        <Person />
                        <span>
                          {selectedVendor && selectedVendor.vendor_name}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4 info-item">
                      <div className="text">Product csv files</div>
                      {importFileData.csvFile && (
                        <div className="upload-name">
                          <span className="badge csv">CSV</span>
                          <span className="file-name">
                            {importFileData.csvFile}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="col-sm-12 col-md-3 info-item">
                      <div className="text">Product zip files</div>
                      {importFileData.zipFile && (
                        <div className="upload-name">
                          <span className="badge zip">ZIP</span>
                          <span className="file-name">
                            {importFileData.zipFile}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="col-sm-12 col-md-1 info-to-import">
                      <button
                        className="to-import-btn"
                        onClick={() => {
                          this.props.movePrevStep();
                        }}
                      >
                        <Edit />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {importStep.stepState === 1 ? (
                <ProductInfo
                  importFileData={this.props.importFileData.importData}
                />
              ) : null}
              {importStep.stepState === 2 ? (
                <ShippingInfo
                  importFileData={this.props.importFileData.importData}
                />
              ) : null}
              {importStep.stepState === 3 ? (
                <Pricing
                  importFileData={this.props.importFileData.importData}
                />
              ) : null}
              {importStep.stepState === 4 ? (
                <AdditionalCoast
                  importFileData={this.props.importFileData.importData}
                />
              ) : null}
              {importStep.stepState === 5 ? (
                <PreviewImport
                  importFileData={this.props.importFileData.importData}
                />
              ) : null}
              <StepButtons />
            </div>
          ) : null}
        </div>
        <GlobalStep />
      </div>
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

const mapDispatchToProps = dispatch => {
  return {
    movePrevStep: () => {
      dispatch(movePrevStep);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ImportPage));
