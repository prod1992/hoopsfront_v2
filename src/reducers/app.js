import { APP_READY } from "../actions/action-types";

const appReducer = (state = {}, action) => {
  switch (action.type) {
    case APP_READY:
      return {
        ...state,
        appReady: true
      };
    default:
      return state;
  }
};

export default appReducer;
