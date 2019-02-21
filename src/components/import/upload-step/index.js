import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SelectDropdown from "../../../components/shared/select-dropdown";
import StepButtons from "../shared/step-buttons";
import { withStyles } from "@material-ui/core/styles";
import VideoBtn from "../../shared/WatchVideoButton";
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

import { toast, ToastContainer } from "react-toastify";
import Dropzone from "react-dropzone";
import { Grid, Paper, Chip } from "@material-ui/core";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Close from "@material-ui/icons/Close";

import IntergrationReactSelect from "../../../components/shared/IntegrationReactSelect";

const styles = theme => ({
  heading: {
    fontWeight: 400,
    fontSize: 16
  },
  uploadFileRoot: {
    padding: 24
  },
  dropZone: {
    minHeight: 220,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px dashed #93a6ab",
    borderRadius: 3
  },
  dropZoneGroup: {
    margin: "10px 0"
  },
  dropZoneTitle: {
    fontWeight: 500,
    margin: "6px 0 0",
    fontSize: "1.125rem"
  },
  dropZoneInner: {
    maxWidth: 300,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    alignItems: "center"
  },
  dropZoneLabel: {
    marginBottom: 5
  },
  dropZoneIcon: {
    marginRight: 10,
    width: 55,
    height: 55,
    borderRadius: "50%",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#93a6ab"
  }
});

class UploadFiles extends React.Component {
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
    const { progress, classes } = this.props;

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

    const RenderBlueUrl = props => {
      return (
        <div>
          <Link
            to={props.to}
            style={{
              textDecoration: "underline",
              display: "flex",
              alignItems: "center",
              color: "#1db3e7",
              fontSize: 14,
              lineHeight: 1.5,
              textUnderlinePosition: "below",
              webkitTextUnderlinePosition: "under",
              msTextUnderlinePosition: "below",
              textUnderlinePosition: "under"
            }}
          >
            {props.icon}
            <span style={{ marginLeft: 5 }}>{props.anchorText}</span>
          </Link>
          {props.text && <p style={{ margin: 0 }}>{props.text}</p>}
        </div>
      );
    };

    const RenderLabelGroup = props => {
      let chipStyles = {
        borderRadius: 2,
        padding: 0,
        height: 20,
        margin: "0 10px",
        color: "#FFFFFF",
        fontSize: ".8125rem",
        textTransform: "capitalize",
        fontFamily: "inherit"
      };
      chipStyles.backgroundColor =
        props.priority === "required" ? "#e3645b" : "#f0ab5d";
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{props.text}</span>
          <Chip style={chipStyles} label={props.priority} />
          <RenderBlueUrl anchorText={"What's this?"} to={props.url} />
        </div>
      );
    };

    return (
      <div>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          spacing={16}
        >
          <Grid item>
            <h5 className={classes.heading}>Upload file</h5>
          </Grid>
          <Grid item>
            <VideoBtn />
          </Grid>
        </Grid>
        <Paper className={classes.uploadFileRoot}>
          <ToastContainer autoClose={2000} />
          <Grid container>
            <Grid item>
              <div className="custom-container">
                <div className="upload-body">
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
              <div className="field-col">
                <RenderLabelGroup
                  text={"Select vendor"}
                  url={
                    "http://help.hoopscrm.com/catalog/import-field-explanations/vendor"
                  }
                  priority={"required"}
                />

                <div className="custom-field-row">
                  <IntergrationReactSelect />
                </div>
              </div>
            </Grid>
            <Grid item style={{ marginLeft: "auto" }}>
              <RenderBlueUrl
                to="/"
                anchorText={"Download the basic template"}
                text={"Great for simple products like apparel."}
                icon={<CloudDownload />}
              />
              <RenderBlueUrl
                to="/"
                anchorText={"Download the complete template"}
                text={"Great for complex products like promotional products."}
                icon={<CloudDownload />}
              />
              <RenderBlueUrl
                to="/"
                anchorText={"Download the basic template"}
                icon={<CloudDownload />}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <div className={classes.dropZoneGroup}>
                <RenderLabelGroup
                  text={"Upload product csv"}
                  url={
                    "http://help.hoopscrm.com/catalog/import-field-explanations/what-format-do-csv-files-need-to-be"
                  }
                  priority={"required"}
                />

                <div className={classes.dropZone}>
                  {csvFileName === "" ? (
                    <Dropzone
                      onDrop={acceptedFile =>
                        this.onFileUpdate(acceptedFile[0], "csv")
                      }
                      multiple={false}
                      accept=".csv"
                      className={classes.dropZone}
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
                          <div className={classes.dropZoneInner}>
                            <div className={classes.dropZoneIcon}>
                              <CloudDownload />
                            </div>
                            <div className="drag-description">
                              <h4 className={classes.dropZoneTitle}>
                                Drag and drop
                              </h4>
                              <div>
                                Your file here, or <u>click to locate file</u>
                              </div>
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
            </Grid>
            <Grid item xs={12}>
              <div className={classes.dropZoneGroup}>
                <RenderLabelGroup
                  text={"Upload product images (.zip file)"}
                  url={
                    "http://help.hoopscrm.com/catalog/import-field-explanations/how-do-i-import-product-images"
                  }
                  priority={"recommended"}
                />

                <div className={classes.dropZone}>
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
                          <div className={classes.dropZoneInner}>
                            <div className={classes.dropZoneIcon}>
                              <CloudDownload />
                            </div>
                            <div className="drag-descriptioTitlen">
                              <h4 className={classes.dropZoneTitle}>
                                Drag and drop
                              </h4>
                              <div>
                                Your file here, or <u>click to locate file</u>
                              </div>
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
            </Grid>
          </Grid>
          {this.props.selectVendor.addNewVendor && <AddVendor />}
        </Paper>
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
