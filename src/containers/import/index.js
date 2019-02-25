import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import CustomizedStepper from "../../components/import/Stepper";

import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";

// import GlobalStep from "../../components/import/shared/import-global-step";
// import ImportStateChart from "../../components/import/shared/state-chart";s
import AdditionalCoast from "../../components/import/additional-cost";
import StepButtons from "../../components/import/shared/step-buttons";
import PreviewImport from "../../components/import/preview-import";
import ShippingInfo from "../../components/import/shipping-info";
import UploadFiles from "../../components/import/upload-step";
import ProductInfo from "../../components/import/product-info";
import Pricing from "../../components/import/pricing";
import { movePrevStep } from "../../actions/catalogue-actions";

import {
  Backup as BackupIcon,
  Favorite as FavoriteIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  OpenInBrowser as ImportIcon
} from "@material-ui/icons";

import {
  Icon,
  Chip,
  IconButton,
  Grid,
  Paper,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";

const styles = theme => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 240,
    right: 0,
    backgroundColor: "#172027"
  },
  wrapper: {
    color: "#94aec7",
    flexDirection: "row",
    selected: {
      color: "#FFFFFF"
    }
  },
  pageWrapper: {
    marginBotttom: 70
  },
  resultsPaper: {
    padding: 16,
    fontSize: 14
  },
  successChip: {
    backgroundColor: "#52ba57",
    color: "#FFFFFF",
    borderRadius: 0,
    fontSize: 12,
    fontWeight: 600,
    padding: "1px 4px",
    marginRight: 6,
    height: "auto"
  }
});

class ImportPage extends React.Component {
  state = {
    value: "recents"
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes, importStep, importFileData, selectedVendor } = this.props;

    return (
      <div className={classes.pageWrapper}>
        {importStep.stepState === 0 ? <UploadFiles /> : ""}
        {importStep.stepState !== 0 ? (
          <div className="step-shared-wrapper">
            <CustomizedStepper />

            <Paper className={classes.resultsPaper}>
              <Grid container>
                <Grid item xs>
                  <div>
                    <strong>Vendor</strong>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Person color="primary" />
                    <span>{selectedVendor.single.label}</span>
                  </div>
                </Grid>
                <Grid item xs>
                  <div>
                    <strong>Product csv files</strong>
                  </div>
                  {importFileData.csvFile && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Chip label={"CSV"} className={classes.successChip} />

                      <span className="file-name">
                        {importFileData.csvFile}
                      </span>
                    </div>
                  )}
                </Grid>
                <Grid item xs>
                  <div className="text">Product zip files</div>
                  {importFileData.zipFile && (
                    <div className="upload-name">
                      <span className="badge zip">ZIP</span>
                      <span className="file-name">
                        {importFileData.zipFile}
                      </span>
                    </div>
                  )}
                </Grid>
                <Grid item xs={"auto"}>
                  <IconButton
                    className="to-import-btn"
                    onClick={() => {
                      this.props.movePrevStep();
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
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
              <Pricing importFileData={this.props.importFileData.importData} />
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

        <BottomNavigation
          showLabels
          value={value}
          onChange={this.handleChange}
          className={classes.root}
        >
          <BottomNavigationAction
            className={classes.wrapper}
            label="Upload File"
            value="recents"
            icon={<BackupIcon />}
          />
          <BottomNavigationAction
            className={classes.wrapper}
            label="Map and preview"
            value="map_and_preview"
            icon={<RemoveRedEyeIcon />}
          />
          <BottomNavigationAction
            className={classes.wrapper}
            label="Import"
            value="import"
            icon={<ImportIcon />}
          />
        </BottomNavigation>
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
