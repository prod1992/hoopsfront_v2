import {
  sendStepOneData,
  setCatalogImportData,
  fetchStart,
  fetchEnd,
  fetchProgressLoaded
} from "../actions/import-actions";
import axios from "axios";
import getApiCredentials, {
  catalogImportUri,
  catalogImportProcessUri
} from "../constants/api";
import { moveNextStep } from "../actions/catalogue-actions";
require("whatwg-fetch");

//asd
export const onUpload = uploadData => {
  return dispatch => {
    const reqUri = getApiCredentials.host + catalogImportUri;
    const userToken = localStorage.getItem("userToken");
    dispatch(fetchStart());
    axios
      .request({
        url: reqUri,
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + userToken
        },
        data: uploadData,
        onUploadProgress: p => {
          dispatch(fetchProgressLoaded(p.loaded / p.total));
        }
      })
      .then(res => {
        dispatch(fetchProgressLoaded(1));
        dispatch(fetchEnd());
        dispatch(sendStepOneData(true));
        dispatch(setCatalogImportData(res.data));
        dispatch(moveNextStep);
      })
      .catch(err => {
        /*Todo after fixing zip files required bug in back end remove the next line*/
        dispatch(moveNextStep);
        dispatch(fetchEnd());
        console.error("error", err);
      });
  };
};

export const onFinish = data => {
  return dispatch => {
    const reqUri = getApiCredentials.host + catalogImportProcessUri;
    const userToken = localStorage.getItem("userToken");
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + userToken
      },
      body: data
    };
    const reqInstance = new Request(reqUri, requestOptions);
    return fetch(reqInstance)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json();
          throw new Error("response error");
        }
      })
      .then(data => {
        console.log("response", data);
        dispatch(moveNextStep);
        return data;
      })
      .catch(err => {
        console.error("error", err);
      });
  };
};
