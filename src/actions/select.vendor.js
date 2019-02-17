import {SELECT_VENDOR, ADD_NEW_VENDOR, SET_VENDOR_LIST, ADD_NEW_CREATED_VENDOR} from "./action-types";

export const SetSelectedVendor = (payload) => {
    return {
        type: SELECT_VENDOR,
        payload
    }
};

export const AddNewVendor = (payload) => {
    return {
        type: ADD_NEW_VENDOR,
        payload
    }
};

export const SetVendorList = (payload) => {
    return {
        type: SET_VENDOR_LIST,
        payload
    }
};

export const AddNewCreatedVendor = (payload) => {
    return {
        type: ADD_NEW_CREATED_VENDOR,
        payload
    }
}

