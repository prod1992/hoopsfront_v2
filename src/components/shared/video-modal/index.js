import {changeVideoButton} from '../../../store/actions/catalogue-actions';
import React, {Component} from 'react';
import {connect} from "react-redux";
import {Modal} from "../../modal/modal";

class VideoModal extends Component{
    constructor(props){
        super(props);
        this.renderVideoByImportStep = this.renderVideoByImportStep.bind(this);
    }
    closeModal(){
        this.props.dispatch(changeVideoButton(false))
    }

    renderVideoByImportStep(param){
        switch(param){
            case 0:
                return <iframe  allow="autoplay; encrypted-media" allowFullScreen="" frameBorder="0" height="400" src="https://www.youtube.com/embed/0SwQXsSE4Xw" width="100%"/>
            case 1:
                return <iframe allow="autoplay; encrypted-media" allowFullScreen="" frameBorder="0" height="400" src="https://www.youtube.com/embed/Pptr283yqRk" width="100%"/>
            case 2:
                return <iframe allow="autoplay; encrypted-media" allowFullScreen="" frameBorder="0" height="400" src="https://www.youtube.com/embed/mLpxdgwVp8g" width="100%"/>
            case 3:
                return <iframe allow="autoplay; encrypted-media" allowFullScreen="" frameBorder="0" height="400" src="https://www.youtube.com/embed/7smu-NJF2-o" width="100%"/>
            case 4:
                return <iframe allow="autoplay; encrypted-media" allowFullScreen="" frameBorder="0" height="400" src="https://www.youtube.com/embed/UFe7kUd7I3w" width="100%"/>
            default:
                return <iframe  allow="autoplay; encrypted-media" allowFullScreen="" frameBorder="0" height="400" src="https://www.youtube.com/embed/0SwQXsSE4Xw" width="100%"/>
        }
    }

    render(){
        const stepState = this.props.importStepsReducer;
        return(
            <Modal>
                <span className="close_popup" onClick={() => this.closeModal()}/>
                <div className="popup_iframe">
                    {this.renderVideoByImportStep(stepState)}
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        importStepsReducer: state.importStepsReducer.stepState,
        videoData: state.playVideo
    };
};

export default connect(mapStateToProps)(VideoModal);