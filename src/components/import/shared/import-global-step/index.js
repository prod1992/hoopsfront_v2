import React, {Component} from 'react';
import { connect } from 'react-redux';

class GlobalStep extends Component{
    constructor(props){
        super(props);
        this.renderCommonBtn = this.renderCommonBtn.bind(this);
    }

    renderCommonBtn(param){
        if(param !== 0 && param !== 5){
            return(
                <div className='item active'>
                    <i className='material-icons'>remove_red_eye</i>
                    <span>Map and preview</span>
                </div>
            )
        }else{
            return (
                <div className='item'>
                    <i className='material-icons'>remove_red_eye</i>
                    <span>Map and preview</span>
                </div>
            )
        }
    }

    render(){
        const stepData = this.props.importStep;
        return(
            <div className='bottom-state-footer'>
                <div className={stepData['stepState'] === 0 ? 'item active' : 'item'}>
                    <i className='material-icons'>cloud_upload</i>
                    <span>Upload File</span>
                </div>
                {
                    this.renderCommonBtn(stepData['stepState'])
                }
                <div className={stepData['stepState'] === 5 ? 'item active' : 'item'}>
                    <i className='material-icons'>open_in_browser</i>
                    <span>Import</span>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        importStep: state.importStepsReducer
    };
}

export default connect(mapStateToProps)(GlobalStep);