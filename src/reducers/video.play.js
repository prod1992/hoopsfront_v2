import {
  USER_LOGGED_IN,
  SET_USER_DATA,
  VIDEO_MODAL_STATE
} from "../actions/action-types";
const initialState = {
  openVideoOpened: false
};

const playVideo = (state = { ...initialState }, action) => {
  switch (action.type) {
    case VIDEO_MODAL_STATE:
      return {
        ...state,
        openVideoOpened: action.payload
      };
    default:
      return state;
  }
};

export default playVideo;
