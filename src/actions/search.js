import {SEARCH_NAME_QUERY} from "./action-types";

export const sendSearchQuery = payload => {
    return {
        type: SEARCH_NAME_QUERY,
        query: payload
    };
};