import {SELECT_CSV, SELECT_ZIP, SEND_STEP_ONE_DATA, SET_IMPORT_DATA, SET_PROPERTY, SET_IMPORT_ERROR, FETCH_START, FETCH_END, FETCH_PROGRESS_LOADED,
    SET_CSV_FILE, SET_ZIP_FILE, REMOVE_CSV_FILE, REMOVE_ZIP_FILE} from "./action-types";


export const setCsv = (payload) => {
    return {
        type: SELECT_CSV,
        payload
    };
};

export const setZip = (payload) => {
    return {
        type: SELECT_ZIP,
        payload
    }
};

export const sendStepOneData = (payload) => {
    return {
        type: SEND_STEP_ONE_DATA,
        payload
    }
};

export const setCatalogImportData = (payload) => {
    return {
        type: SET_IMPORT_DATA,
        payload
    }
};

export const setCsvFile = (payload) => {
    return {
        type: SET_CSV_FILE,
        payload
    }
};

export const setZipFile = (payload) => {
    return {
        type: SET_ZIP_FILE,
        payload
    }
};

export const removeCsvFile = () => {
    return {
        type: REMOVE_CSV_FILE
    }
};

export const removeZipFile = () => {
    return {
        type: REMOVE_ZIP_FILE
    }
};

export const stepOneFetchError = (payload) => {
    return {
        type: SET_IMPORT_ERROR,
        payload
    }
};
export const fetchStart = () => {
    return {
        type: FETCH_START
    }
};

export const fetchProgressLoaded = (progress) => {
    return {
        type: FETCH_PROGRESS_LOADED,
        payload: progress
    }
};

export const fetchEnd = () => {
    return {
        type: FETCH_END
    }
};

export const setImportedProperty = (payload) => {
    return {
        type: SET_PROPERTY,
        payload
    }
};