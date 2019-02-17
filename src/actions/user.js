import { USER_LOGGED_IN, SET_USER_DATA } from "./action-types";

export const UserLoggedIn = payload => {
  return {
    type: USER_LOGGED_IN,
    payload
  };
};

export const SetUserData = payload => {
  return {
    type: SET_USER_DATA,
    payload
  };
};
