import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Logo from "../../Logo";
import { LOGIN_FIELD_GROUP } from "../../../constants";

import User from "../../../core/auth";
import { SetUserData, UserLoggedIn } from "../../../actions/user";
import LoginForm from "./LoginForm";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "100vh"
  },
  root: {
    backgroundColor: "#3fbeeb",
    color: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    maxWidth: 576,
    width: "100%",
    boxShadow: "none",
    [theme.breakpoints.up("sm")]: {
      maxWidth: 768
    }
  }
});

class Login extends React.Component {
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
      <div className={classes.wrapper + " app-layouts--login"}>
        <Paper className={classes.root}>
          <Grid
            container
            style={{ maxWidth: 768, margin: "auto", padding: 50 }}
          >
            <Grid item xs={12} md={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%"
                }}
              >
                <Link to={"/"}>
                  <Logo
                    fill={[
                      "#FFFFFF",
                      "#FFFFFF",
                      "#FFFFFF",
                      "#FFFFFF",
                      "#FFFFFF"
                    ]}
                  />
                </Link>
                <div>
                  <p>We believe business can be easy</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <LoginForm onSubmit={this.submit} formGroup={LOGIN_FIELD_GROUP} />
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
