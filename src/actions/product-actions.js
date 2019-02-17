import {EDIT_PRODUCT} from "./action-types";

export const editProduct = (payload) => {
    return {
        type: EDIT_PRODUCT,
        payload
    }
};