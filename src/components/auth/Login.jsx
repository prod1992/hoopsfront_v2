
import React, { Component } from "react";
import { connect } from "react-redux";


//import LoginRegisterLogo from "../logo/index";
import { LOGIN_FIELD_GROUP } from "../../constants";

import User from "../../core/auth";
import { SetUserData, UserLoggedIn } from "../../actions/user";
import ContactForm from "./ContactForm.jsx";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    backgroundColor: "#3fbeeb",
    color: "#FFFFFF",
    borderBottomColor: "#FFFFFF"
  },
  whiteInput: {
    borderBottomColor: "#FFFFFF"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.login = this.login.bind(this);
  }

  submit(values) {
    User.loginRegister(values, "/api/auth/login").then(data => {
      if (data && data["access_token"]) {
        this.login(data["access_token"]);
      }
    });
  }

  login(token) {
    localStorage.setItem("userToken", token);
    User.getUser(token)
      .then(data => {
        this.props.dispatch(SetUserData(data));
      })
      .then(() => {
        this.props.dispatch(UserLoggedIn(true));
      })
      .then(() => {
        this.props.history.push("/");
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="main-wrapper-layout light-blue">
        <Paper className={classes.root}>
          <Grid
            container
            spacing={32}
            style={{ maxWidth: 960, margin: "auto", padding: 50 }}
          >
            <Grid item md={6}>
              <a />
            </Grid>
            <Grid item md={6}>
              <ContactForm
                onSubmit={this.submit}
                formGroup={LOGIN_FIELD_GROUP}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer
  };
}

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Login)
);
