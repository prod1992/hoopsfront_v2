import { changeVideoButton } from "../../actions/catalogue-actions";
import playVideo from "../../reducers/video.play";
import React from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import PlayArrow from "@material-ui/icons/PlayArrow";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    display: "flex",
    alignItems: "center",
    padding: 0
  }
});

class VideoBtn extends React.Component {
  openCloseVideoPopUp() {
    console.log("open video");
    this.props.dispatch(changeVideoButton(true));
  }

  render() {
    const { classes } = this.props;
    return (
      <button
        className={classes.button}
        onClick={() => this.openCloseVideoPopUp()}
        variant="outlined"
        color="primary"
      >
        <PlayArrow />
        <span>Watch the video</span>
      </button>
    );
  }
}

const mapStateToProps = state => {
  return {
    videoData: state.playVideo
  };
};

export default connect(mapStateToProps)(withStyles(styles)(VideoBtn));
