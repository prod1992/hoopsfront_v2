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
import { Grid, Paper, Chip, Button } from "@material-ui/core";
import CloudDownload from "@material-ui/icons/CloudDownload";
import Close from "@material-ui/icons/Close";

import AppSelect from "../../shared/AppSelect";

const styles = theme => ({
  root: {
    maxWidth: 1100,
    marginLeft: "auto",
    marginRight: "auto"
  },
  heading: {
    fontWeight: 400,
    fontSize: 16,
    margin: ".5rem 0 .4rem 0"
  },
  paper: {
    padding: 24
  },
  dropZone: {
    height: 220,
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
    fontSize: "1.125rem",
    lineHeight: "110%"
  },
  dropZoneInner: {
    maxWidth: 300,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    alignItems: "center"
  },
  dropZoneLabel: {
    marginBottom: 15
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
  },
  chipLabel: {
    padding: "1px 8px 0"
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
          <a
            {...props}
            href={props.to}
            style={{
              textDecoration: "underline",
              display: "flex",
              alignItems: "center",
              color: "#1db3e7",
              fontSize: props.fontSize,
              textUnderlinePosition: "below",
              WebkitTextUnderlinePosition: "under",
              MsTextUnderlinePosition: "below",
              textUnderlinePosition: "under"
            }}
          >
            {props.icon}
            <span style={{ marginLeft: 5 }}>{props.anchorText}</span>
          </a>
          {props.text && <p style={{ margin: 0 }}>{props.text}</p>}
        </div>
      );
    };

    const RenderLabelGroup = props => {
      const rootStyles = {
        display: "flex",
        alignItems: "center",
        marginBottom: 10
      };
      let chipStyles = {
        borderRadius: 2,
        padding: 0,
        height: 20,
        margin: "0 15px",
        color: "#FFFFFF",
        fontSize: ".8125rem",
        textTransform: "capitalize",
        fontFamily: "inherit"
      };
      chipStyles.backgroundColor =
        props.priority === "required" ? "#e3645b" : "#f0ab5d";
      return (
        <div style={rootStyles}>
          <span>{props.text}</span>
          <Chip
            classes={{ label: classes.chipLabel }}
            style={chipStyles}
            label={props.priority}
          />
          <RenderBlueUrl
            fontSize={12}
            anchorText={props.anchorText}
            to={props.url}
          />
        </div>
      );
    };

    return (
      <div className={classes.root}>
        <Grid
          container
          row
          justify="space-between"
          align="center"
          spacing={16}
          style={{ marginBottom: 30 }}
        >
          <Grid item>
            <h4 className={classes.heading}>Upload file</h4>
          </Grid>
          <Grid item>
            <VideoBtn />
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
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
                </div>
              </div>
              <div className="field-col">
                <RenderLabelGroup
                  text={"Select vendor"}
                  url={
                    "http://help.hoopscrm.com/catalog/import-field-explanations/vendor"
                  }
                  priority={"required"}
                  anchorText={"What's this?"}
                />

                <AppSelect />
              </div>
            </Grid>
            <Grid item style={{ marginLeft: "auto" }}>
              <RenderBlueUrl
                download
                fontSize={14}
                to="/../csv/Catalog-Import-Template-Complete.csv"
                anchorText={"Download the basic template"}
                text={"Great for simple products like apparel."}
                icon={<CloudDownload />}
              />
              <RenderBlueUrl
                fontSize={14}
                to="/"
                anchorText={"Download the complete template"}
                text={"Great for complex products like promotional products."}
                icon={<CloudDownload />}
              />
              <RenderBlueUrl
                fontSize={14}
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
                  anchorText={"What's this?"}
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
                            height: "100%",
                            display: "flex"
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
                                your file here, or <u>click to locate file</u>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  ) : (
                    <div className="selected-file-wrapper">
                      <span>{csvFileName}</span>
                      <Button
                        color="red"
                        onClick={() => this.removeFile("csv")}
                      >
                        <Close />
                      </Button>
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
                  anchorText={"What's this?"}
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
                            height: "100%",
                            display: "flex"
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
                                your file here, or <u>click to locate file</u>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                  ) : (
                    <div className="selected-file-wrapper">
                      <span>{zipFileName}</span>
                      <Button onClick={() => this.removeFile("zip")}>
                        <Close />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <StepButtons formData={this.formData} firstPage={true} />
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
