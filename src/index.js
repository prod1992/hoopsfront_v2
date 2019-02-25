import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./containers/App.jsx";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "./ui/theme";
import { CssBaseline } from "@material-ui/core";

import("./assets/scss/index.scss");

const rootElement = document.getElementById("root");

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </MuiThemeProvider>,
  rootElement
);

if (module.hot) {
  module.hot.accept();
}
