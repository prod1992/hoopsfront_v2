import { applyMiddleware, createStore } from "redux";
// import syncMiddleware from "./middlwares/sync.middleware";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// const setMiddleware = () => {
//     let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//     if (process.env.NODE_ENV === 'production') {
//         composeEnhancers = (fn) => fn;
//     }
//     return composeEnhancers(applyMiddleware(
//         syncMiddleware
//     ));
// };

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
