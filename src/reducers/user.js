import { USER_LOGGED_IN, SET_USER_DATA } from "../actions/action-types";
const initialState = {
  isLoggedIn: false
};

const authReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
