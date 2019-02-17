import {FILTER_DATA} from "../actions/action-types";

const initialState = {
    filteredProducts: []
};


export default function (state = {...initialState}, action) {
    switch (action.type) {
        case FILTER_DATA:
            return {
                ...state,
                filteredProducts: action.payload
            };
        default:
            return state;
    }
}