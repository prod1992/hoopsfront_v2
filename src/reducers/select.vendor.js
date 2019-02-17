import {SELECT_VENDOR, ADD_NEW_VENDOR, SET_VENDOR_LIST} from "../actions/action-types";

const initialState = {
    selected: null,
    addNewVendor: false,
    vendorList: []
};

const selectVendor = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_VENDOR:
            return{
                ...state,
                selected: action.payload
            };
        case ADD_NEW_VENDOR:
            return{
                ...state,
                addNewVendor: action.payload
            };
        case SET_VENDOR_LIST:
            return{
                ...state,
                vendorList: action.payload
            }
        default:
            return state;
    }
};

export default selectVendor;