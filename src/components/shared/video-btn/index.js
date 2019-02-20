import { changeVideoButton } from "../../../actions/catalogue-actions";
import playVideo from "../../../reducers/video.play";
import React, { Component } from "react";
import { connect } from "react-redux";
import PlayArrow from "@material-ui/icons/PlayArrow";
class VideoBtn extends Component {
  openCloseVideoPopUp() {
    console.log("open video");
    this.props.dispatch(changeVideoButton(true));
  }

  render() {
    return (
      <button className="video-btn" onClick={() => this.openCloseVideoPopUp()}>
        <i className="video-icon">
          <PlayArrow />
        </i>
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

export default connect(mapStateToProps)(VideoBtn);
