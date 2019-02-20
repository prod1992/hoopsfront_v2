// import connect from "react-redux/es/connect/connect";
import React, {Component} from 'react';
import { connect } from 'react-redux';

const pointList = [
    {
        number: 1,
        label: 'Product Info'
    },
    {
        number: 2,
        label: 'Shipping info'
    },
    {
        number: 3,
        label: 'Pricing'
    },
    {
        number: 4,
        label: 'Additional Cost'
    },
    {
        number: 5,
        label: 'Preview and import'
    }
];

class ImportStateChart extends Component{
    render(){
        const currentStep = this.props.importStep;
        return(
            <div className='state-chart'>
                <div className='line-wrap'>
                    <div className='line-stat'/>
                    <span className='line-desc'>Start data mapping</span>
                </div>
                {
                    pointList.map((item, index) => (
                        <div className={item['number'] === currentStep['stepState'] ? `state-show-point p-${item['number']} + active` : `state-show-point p-${item['number']}`} key={index}>
                            <div className='point-section'>
                                <div className='point'>
                                    {item['number']}
                                </div>
                                <div className='point-stat-head'>
                                    {item['label']}
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className='line-wrap'>
                    <div className='line-stat'/>
                    <span className='line-desc'>Completed</span>
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

export default connect(mapStateToProps)(ImportStateChart);