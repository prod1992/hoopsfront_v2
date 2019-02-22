import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./containers/App.jsx";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./ui/theme";

import("./assets/scss/index.scss");

const rootElement = document.getElementById("root");

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  rootElement
);

if (module.hot) {
  module.hot.accept();
}
