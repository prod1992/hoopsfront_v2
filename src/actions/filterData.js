import {FILTER_DATA} from "./action-types";

export const filterData = filterData => {
    return {
        type: FILTER_DATA,
        filterData
    };
};