import {SetSelectedVendor, SetVendorList} from '../../../store/actions/select.vendor';
import {AddNewVendor} from '../../../store/actions/select.vendor';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import getApiCredentials from "../../../core/constants";
import {setProducts} from "../../../store/actions/catalogue-actions";

class SelectDropdown extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dropOpen: false
        };
        this.getVendorData = this.getVendorData.bind(this);
    }
    addNewVendor(){
        this.props.dispatch(AddNewVendor(true))
    }
    hendleOptionValue(item){
        this.props.dispatch(SetSelectedVendor(item));
        this.setState({
            dropOpen: false
        })
    }
    toggleDropdown(){
        if(this.state.dropOpen === false){
            this.setState({
                dropOpen: true
            })
        }else{
            this.setState({
                dropOpen: false
            })
        }
    }
    sortDataByName(event){
        let sortedArray = [],
            regExp = event.target.value.toLowerCase(),
            list = this.props.selectVendor.vendorList && this.props.selectVendor.vendorList.data;
        //let filteredIds;
        for(let i in list){
            let listItem = list[i]["vendor_name"].toLowerCase();
            if(listItem.indexOf(regExp) > -1){
                console.log(regExp, 'Ham@nkav', list[i]["vendor_name"]);
                sortedArray.push({vendor_name: list[i]["vendor_name"]});
                console.log(list[i]["vendor_name"], "listiiii");
                //filteredIds = list.filter((value) => value.name === list[i].name);
            }
        }
       // console.log(filteredIds, "filteeer");
    }
    getVendorData(){
        let token = localStorage['userToken'];
        let uri = getApiCredentials.host + "/api/vendors";
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': "Bearer " + token
            }
        };
        const reqInstance = new Request(uri, requestOptions);
        fetch(reqInstance)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
            })
            .then(data => {
                this.props.dispatch(SetVendorList(data));
            }).catch((err) => console.log(err, "error111"))
    }
    componentDidMount() {
        this.getVendorData();
    }

    render(){
        const {selectVendor} = this.props;
        return(
            <div className='select-drop'>
                <div className='value' onClick={() => this.toggleDropdown()}>{selectVendor.selected === null ? 'Select drop' : selectVendor.selected['vendor_name']}</div>
                {
                    this.state.dropOpen && (
                        <div className='dropdown'>
                            {/*<input type='text' className='search' onChange={() => this.sortDataByName(event)}/>*/}
                            <div className='options'>
                                <div className='shared-scroll-view'>
                                    <button className='add-new' onClick={() => this.addNewVendor()}>Add new</button>
                                    {
                                        selectVendor.vendorList.data && selectVendor.vendorList.data.map((item) => (<div className='option' key={item.id} onClick={() => this.hendleOptionValue(item)}>{item["vendor_name"]}</div>))
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        selectVendor: state.selectVendor
    }
}

export default connect(mapStateToProps)(SelectDropdown)
