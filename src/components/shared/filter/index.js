import {filterShowHide} from '../../../actions/catalogue-actions';
import React, {Component} from 'react';
import { connect } from 'react-redux';

class Filter extends Component{
    constructor(props){
        super(props);
    }

    showFilterBar(){
        this.props.dispatch(filterShowHide(true))
    }

    render(){
        const {catalogueStates} = this.props;
        return(
            <div className='filter-section'>
                <div className='input-filter'>
                    <input type='text' placeholder='Enter Your search here' />
                    <button className='search-chick-handler'>
                        <i className='material-icons'>search</i>
                    </button>
                </div>
                <button className='filter-btn' onClick={() => this.showFilterBar()}>
                    <i className='material-icons'>filter_list</i>
                    <span>Filter</span>
                </button>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        catalogueStates: state.catalogueReducer,
    }
}

export default connect(mapStateToProps)(Filter)