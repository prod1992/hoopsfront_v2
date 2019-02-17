import {SEARCH_NAME_QUERY} from "../actions/action-types";

export default function (state = "", action) {
    switch (action.type) {
        case SEARCH_NAME_QUERY:
            return action.query;

        default:
            return state;
    }
}