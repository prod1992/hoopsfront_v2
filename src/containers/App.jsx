import React from "react";
import { connect } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import AuthRouteWrapper from "./auth-route-wrapper";
import Dashboard from "./dashboard";
import User from "../core/auth";
import { SetUserData, UserLoggedIn } from "../actions/user";

import { AppReady } from "../actions/app";

import theme from "../ui/theme";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.login = this.login.bind(this);
  }
  init() {
    let userToken = localStorage.getItem("userToken");
    if (userToken) {
      this.login(userToken);
    } else {
      this.props.dispatch(AppReady);
    }
  }
  login(token) {
    User.getUser(token)
      .then(data => {
        if (!!data) {
          this.props.dispatch(SetUserData(data));
        } else throw data;
      })
      .then(() => {
        this.props.dispatch(UserLoggedIn(true));
      })
      .then(() => this.props.dispatch(AppReady))
      .catch(() => this.props.dispatch(AppReady));
  }
  componentDidMount() {
    this.init();
  }
  render() {
    const { auth } = this.props;

    return (
      !!this.props.appReady && (
        <Router>
          {!auth.isLoggedIn ? (
            <AuthRouteWrapper />
          ) : (
            <Dashboard theme={theme} />
          )}
        </Router>
      )
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer,
    appReady: state.appReducer.appReady,
    playVideo: state.playVideo
  };
}

export default connect(mapStateToProps)(App);
