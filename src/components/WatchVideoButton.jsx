import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { PlayCircleFilled, Close } from "@material-ui/icons";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  IconButton
} from "@material-ui/core";

import { toggleVideoModal } from "../actions/catalogue-actions";

const styles = theme => ({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    border: "1px solid rgba(0,0,0,.2)",
    overflow: "hidden",
    borderRadius: 2,
    lineHeight: 1,
    height: 39,
    "& svg": {
      borderRadius: "50%",
      marginRight: 10,
      animation: "shadow-pulse 2s infinite"
    },
    "&:hover": {
      backgroundColor: "#FFFFFF",
      borderColor: "rgba(0,0,0,.2)"
    }
  }
});

const CustomDialogTitle = withStyles(theme => ({
  paper: {
    borderRadius: "2px"
  },
  root: {
    margin: 0,
    padding: theme.spacing.unit,
    textAlign: "right"
  },
  closeButton: {
    marginLeft: "auto",
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <DialogTitle disableTypography className={classes.root}>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

class WatchVideoButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullWidth: true,
      maxWidth: "sm"
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.props.dispatch(toggleVideoModal(true));
  }

  closeModal() {
    this.props.dispatch(toggleVideoModal(false));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          className={classes.button}
          onClick={this.openModal}
          variant="outlined"
          color="primary"
        >
          <PlayCircleFilled />
          <span>Watch the video</span>
        </Button>
        <Dialog
          classes={{ root: classes.paper }}
          fullWidth={this.state.fullWidth}
          maxWidth={this.state.maxWidth}
          open={this.props.videoModalOpen}
          onClose={this.closeModal}
        >
          <CustomDialogTitle onClose={this.closeModal} />
          <DialogContent>
            <div
              style={{
                paddingBottom: "56.25%",
                height: 0,
                position: "relative"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  height: "100%",
                  width: "100%"
                }}
              />

              <iframe
                style={{ position: "absolute", left: 0, top: 0 }}
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/cWGE9Gi0bB0?controls=0"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, p) => {
  console.log(state);
  return {
    videoModalOpen: state.playVideo.openVideoOpened
  };
};

export default connect(mapStateToProps)(withStyles(styles)(WatchVideoButton));
