import {SELECT_CSV, SELECT_ZIP, SEND_STEP_ONE_DATA, SET_IMPORT_DATA, SET_PROPERTY, SET_IMPORT_ERROR, FETCH_START, FETCH_END, FETCH_PROGRESS_LOADED,
    SET_CSV_FILE, SET_ZIP_FILE, REMOVE_CSV_FILE, REMOVE_ZIP_FILE} from "../actions/action-types";

const initialState = {
    csv: false,
    zip: false,
    upload: false,
    importData: null,
    properties: [],
    error: null,
    fetching: false,
    progress: 0,
    csvFile: null,
    zipFile: null,
};

const importCatalogFiles = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CSV:
            return{
                ...state,
                csv: action.payload
            };
        case SET_CSV_FILE:
            return {
                ...state,
                csvFile: action.payload
            };
        case REMOVE_CSV_FILE:
            return {
                ...state,
                csvFile: {}
            };
        case SELECT_ZIP:
            return{
                ...state,
                zip: action.payload
            };
        case SET_ZIP_FILE:
            return {
                ...state,
                zipFile: action.payload
            };
        case REMOVE_ZIP_FILE:
            return {
                ...state,
                zipFile: {}
            };
        case SEND_STEP_ONE_DATA:
            return {
                ...state,
                upload: action.payload
            };
        case SET_IMPORT_DATA:
            return {
                ...state,
                importData: action.payload
            };
        case SET_IMPORT_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SET_PROPERTY:
            const properties = state.properties.filter(item => item[action.payload.value] !== action.payload.name);
            properties.push({[action.payload.value]: action.payload.name});
            return {
                ...state,
                properties
            };
        case FETCH_START:
            return {
                ...state,
                fetching: true
            };
        case FETCH_END:
            return {
                ...state,
                fetching: false
            };
        case FETCH_PROGRESS_LOADED:
            return {
                ...state,
                progress: action.payload
            };
        default:
            return state;
    }
};

export default importCatalogFiles;