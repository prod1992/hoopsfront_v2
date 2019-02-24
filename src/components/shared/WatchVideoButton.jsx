import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import { toggleVideoModal } from "../../actions/catalogue-actions";
import playVideo from "../../reducers/video.play";

import Modal from "@material-ui/core/Modal";
import PlayCircleFilled from "@material-ui/icons/PlayCircleFilled";

import { Button } from "@material-ui/core";

const styles = theme => ({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    textTransform: "capitalize",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(0,0,0,.2)",
    overflow: "hidden",
    borderRadius: 2,
    lineHeight: 1,
    "& svg": {
      borderRadius: "50%",
      marginRight: 10,
      animation: "shadow-pulse 2s infinite"
    }
  }
});

class VideoBtn extends React.Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  openCloseVideoPopUp() {
    this.props.dispatch(toggleVideoModal(true));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          className={classes.button}
          onClick={() => this.openCloseVideoPopUp()}
          variant="outlined"
          color="primary"
        >
          <PlayCircleFilled />
          <span>Watch the video</span>
        </Button>
        <Modal open={this.state.open}>
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/cWGE9Gi0bB0?controls=0"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    videoData: state.playVideo
  };
};

export default connect(mapStateToProps)(withStyles(styles)(VideoBtn));
