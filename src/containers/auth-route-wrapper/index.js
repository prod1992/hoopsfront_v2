import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Login from "../../components/auth/Login";
import ForgotPassword from "../../components/auth/ForgotPassword";
import Register from "../../components/auth/Register";

class AuthRouteWrapper extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forget-password" component={ForgotPassword} />
          <Route render={() => <Redirect to="/login" />} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default AuthRouteWrapper;
