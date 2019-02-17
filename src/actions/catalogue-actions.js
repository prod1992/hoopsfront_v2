import {BULK_EDIT, NEXT_STEP, PREV_STEP, COLLECT_SELECTED_IDS, SET_PRODUCTS, SELECT_ALL_PRODUCTS, SET_FILTERED_ARRAY, FILTER_SHOW, VIDEO_POPUP_STATE, RESET_SELECTED_IDS} from "./action-types";

export const BulkEditProduct = (payload) => {
    return {
        type: BULK_EDIT,
        payload
    }
};

export const moveNextStep = {
    type: NEXT_STEP
};

export const movePrevStep = {
    type: PREV_STEP
};

export const changeVideoButton = (payload) => {
    return{
        type: VIDEO_POPUP_STATE,
        payload
    }

};

export const collectSelectedIds = (payload) => {
    return {
        type: COLLECT_SELECTED_IDS,
        payload
    };
};

export const selectAllProducts = (payload) => {
    return {
        type: SELECT_ALL_PRODUCTS,
        payload
    }
}

export const setProducts = (payload) => {
    return {
        type: SET_PRODUCTS,
        payload
    };
};

export const filterShowHide = (payload) => {
    return {
        type: FILTER_SHOW,
        payload
    };
};

export const setFilteredProductData = (payload) => {
    return {
        type: SET_FILTERED_ARRAY,
        payload
    };
};

export const resetSelectedIds = (payload) => {
    return {
        type: RESET_SELECTED_IDS,
        payload
    };
};