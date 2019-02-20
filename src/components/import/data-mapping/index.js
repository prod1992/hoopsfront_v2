import SelectDropdown from "../../../components/shared/select-dropdown";
import StepButtons from "../shared/step-buttons";
import VideoBtn from "../../shared/video-btn";
import AddVendor from "../shared/add-vendor";
import {
  setCsv,
  setZip,
  setCsvFile,
  setZipFile,
  removeCsvFile,
  removeZipFile,
  fetchProgressLoaded
} from "../../../actions/import-actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Dropzone from "react-dropzone";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Close from "@material-ui/icons/Close";

import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({});
class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.formData = new FormData();
    this.state = {
      csvFileName: "",
      zipFileName: ""
    };
  }

  componentDidMount() {
    const { importFiles } = this.props;
    this.props.dispatch(fetchProgressLoaded(0));
    this.setState({
      csvFileName: importFiles.csvFile ? importFiles.csvFile : "",
      zipFileName: importFiles.zipFile ? importFiles.zipFile : ""
    });
  }

  notifyOnWrongFileUpdate() {
    toast.error("Wrong type selected!", {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  notifyOnFileRemoving() {
    toast.error("Request aborted by user", {
      position: toast.POSITION.TOP_RIGHT
    });
  }

  onFileUpdate(file, type) {
    if (type === "csv") {
      if (file.name.slice(-3) !== "csv") {
        this.notifyOnWrongFileUpdate();
      } else {
        this.setState({
          csvFileName: file.name
        });
        this.formData.append("csv_file", file);
        this.props.dispatch(setCsv(true));
        this.props.dispatch(setCsvFile(file.name));
      }
    } else if (type === "zip") {
      if (file.name.slice(-3) !== "zip") {
        this.notifyOnWrongFileUpdate();
      } else {
        this.setState({
          zipFileName: file.name
        });
        this.formData.append("zip_images", file);
        this.props.dispatch(setZip(true));
        this.props.dispatch(setZipFile(file.name));
      }
    }
  }

  removeFile(type) {
    if (type === "csv") {
      this.setState({ csvFileName: "" });
      this.formData.delete("csv_file");
      this.props.dispatch(removeCsvFile());
    }
    if (type === "zip") {
      this.setState({ zipFileName: "" });
      this.formData.delete("zip_images");
      this.props.dispatch(removeZipFile());
    }
    this.notifyOnFileRemoving();
  }

  render() {
    const { csvFileName, zipFileName } = this.state;
    const { progress } = this.props;

    const overlayStyle = {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: "2.5em 0",
      border: "2px dashed rgb(149, 149, 149)",
      background: "rgba(219, 217, 217, 0.5)",
      textAlign: "center",
      color: "#fff"
    };
    return (
      <div className="upload-file-step step-1">
        <ToastContainer autoClose={2000} />
        <div className="custom-container">
          <div className="heading-row">
            <h5 className="heading-text">Upload file</h5>
            <VideoBtn />
          </div>
          <div className="upload-body">
            <div className="field-control">
              <div className="row">
                <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
                  <div className="field-col">
                    <div className="action-info">
                      <span className="action-heading">Select vendor</span>
                      <span className="action-priority required">Required</span>
                      <a
                        href="http://help.hoopscrm.com/catalog/import-field-explanations/vendor"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="action-hint"
                      >
                        What's This?
                      </a>
                    </div>
                    <div className="custom-field-row">
                      <SelectDropdown />
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-5 col-lg-5 col-xl-5">
                  <div className="cloud-down-col">
                    <div className="download-row">
                      <span className="down-link">
                        <CloudDownload />
                        <a
                          href="../../../../assets/resources/CSV/Catalog-Import-Template-Complete.csv"
                          download
                        >
                          Download the basic template
                        </a>
                      </span>
                      <span className="description">
                        Great for simple products like apparel.
                      </span>
                    </div>
                    <div className="download-row">
                      <span className="down-link">
                        <CloudDownload />
                        <a
                          href="../../../../assets/resources/CSV/Catalog-Import-Template-Complete.csv"
                          download
                        >
                          Download the complete template
                        </a>
                      </span>
                      <span className="description">
                        Great for complex products like promotional products.
                      </span>
                    </div>
                    <div className="download-row">
                      <span className="down-link">
                        <CloudDownload />
                        <a
                          href="../../../../assets/resources/CSV/Catalog-Import%20Explanations-and%20-Examples.xlsx"
                          download
                        >
                          Download field explanations & example products
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="drag-section">
              <div className="action-info">
                <span className="action-heading">Upload product csv</span>
                <span className="action-priority required">Required</span>
                <a
                  href="http://help.hoopscrm.com/catalog/import-field-explanations/what-format-do-csv-files-need-to-be"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="action-hint"
                >
                  What's This?
                </a>
              </div>
              <div className="drag-arrow">
                {csvFileName === "" ? (
                  <Dropzone
                    onDrop={acceptedFile =>
                      this.onFileUpdate(acceptedFile[0], "csv")
                    }
                    multiple={false}
                    accept=".csv"
                    className="file-upload-dropzone"
                  >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div
                        {...getRootProps()}
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%"
                        }}
                      >
                        <input {...getInputProps()} />
                        {isDragActive && <div style={overlayStyle} />}
                        <div className="arrow-info-data">
                          <div className="drag-icon-wrap">
                            <CloudDownload />
                          </div>
                          <div className="drag-description">
                            <p>Drag and drop</p>
                            <p>
                              Your file here, or <u>click to locate file</u>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                ) : (
                  <div className="selected-file-wrapper">
                    <span>{csvFileName}</span>
                    <button onClick={() => this.removeFile("csv")}>
                      <Close />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="drag-section">
              <div className="action-info">
                <span className="action-heading">
                  Upload product images (.zip file){" "}
                </span>
                <span className="action-priority recommended">Recommended</span>
                <a
                  href="http://help.hoopscrm.com/catalog/import-field-explanations/how-do-i-import-product-images"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="action-hint"
                >
                  What's This?
                </a>
              </div>
              <div className="drag-arrow">
                {zipFileName === "" ? (
                  <Dropzone
                    onDrop={acceptedFile =>
                      this.onFileUpdate(acceptedFile[0], "zip")
                    }
                    multiple={false}
                    accept=".zip"
                    className="file-upload-dropzone"
                  >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <div
                        {...getRootProps()}
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%"
                        }}
                      >
                        <input {...getInputProps()} />
                        {isDragActive && <div style={overlayStyle} />}
                        <div className="arrow-info-data">
                          <div className="drag-icon-wrap">
                            <CloudDownload />
                          </div>
                          <div className="drag-description">
                            <p>Drag and drop</p>
                            <p>
                              Your file here, or <u>click to locate file</u>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                ) : (
                  <div className="selected-file-wrapper">
                    <span>{zipFileName}</span>
                    <button onClick={() => this.removeFile("zip")}>
                      <Close />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {progress !== 0 && (
              <div className="progress-bar-wrapper">
                <div
                  className="progress-bar"
                  style={{
                    background: "#52ba57",
                    width: `${progress * 100}%`
                  }}
                >
                  {(progress * 100).toFixed(0)}% complete
                </div>
              </div>
            )}
            <div className="next-prev-control">
              {/*<div className="right-side">*/}
              {/*<button className="next">*/}
              {/*<span>Next</span>*/}
              {/*<i className="material-icons">trending_flat</i>*/}
              {/*</button>*/}
              {/*</div>*/}
            </div>
            <StepButtons formData={this.formData} firstPage={true} />
          </div>
        </div>
        {this.props.selectVendor.addNewVendor && <AddVendor />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectVendor: state.selectVendor,
    importSteps: state.importStepsReducer,
    importFiles: state.importCatalogFiles,
    progress: state.importCatalogFiles.progress
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(UploadFiles)
);
