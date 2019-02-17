import ContactForm from "./ContactForm";
import { FORGET_PASSWORD_GROUP } from "../../constants/index";
// import ContactPage from "../contact-form/index";
//import LoginRegisterLogo from "../logo/index";
import React, { Component } from "react";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    // User.login(values, 'api/auth/register');
  }

  render() {
    return (
      <div className="main-wrapper-layout light-blue">
        <div className="login-register-wrapper">
          <div className="field-set">
            <div className="user-fields">
              <ContactForm
                onSubmit={this.submit}
                formGroup={FORGET_PASSWORD_GROUP}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPassword;
