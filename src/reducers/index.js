import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import importStepsReducer from "./import-steps";
import selectVendor from "./select.vendor";
import authReducer from "./user";
import importCatalogFiles from "./import";
import catalogueReducer from "./catalogue";
import playVideo from "./video.play";
import appReducer from "./app";
import search from "./search";
import filterData from "./filterData";

export default combineReducers({
  authReducer,
  catalogueReducer,
  appReducer,
  form: formReducer,
  importCatalogFiles,
  playVideo,
  search,
  filterData,
  selectVendor,
  importStepsReducer
});
