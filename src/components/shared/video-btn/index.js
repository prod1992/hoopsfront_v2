import {changeVideoButton} from '../../../store/actions/catalogue-actions';
import playVideo from "../../../store/reducers/video.play";
import React, {Component} from 'react';
import { connect } from 'react-redux';

class VideoBtn extends Component {

    openCloseVideoPopUp(){
        console.log('open video')
        this.props.dispatch(changeVideoButton(true))
    }

    render() {
        return (
            <button className='video-btn' onClick={() => this.openCloseVideoPopUp()}>
                <i className='video-icon'>
                    <i className='material-icons'>play_arrow</i>
                </i>
                <span>Watch the video</span>
            </button>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        videoData: state.playVideo
    };
};

export default connect(mapStateToProps)(VideoBtn);
