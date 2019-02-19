import { BulkEditProduct } from "../../../actions/catalogue-actions";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import User from "../../../core/auth";
import { SetUserData, UserLoggedIn } from "../../../actions/user";
import Modal from "react-modal";
import AddProduct from "../../catalogue/single-product/addingPopup";
import getApiCredentials from "../../../constants/api";

class DropDown extends Component {
  constructor(props) {
    super(props);

    this.renderImportEditBtns = this.renderImportEditBtns.bind(this);
    this.exportCatalogue = this.exportCatalogue.bind(this);
    this.logout = this.logout.bind(this);
  }

  changeBulkEditState() {
    // console.log(this.props.catalogueStates, 'asd');
    this.props.dispatch(BulkEditProduct(true));
  }

  logout() {
    let token = localStorage.getItem("userToken");
    User.logout(token).then(data => {
      console.log(data);
    });
    this.props.dispatch(SetUserData(null));
    this.props.dispatch(UserLoggedIn(false));
    localStorage.clear();
    this.props.history.push("/");
  }

  exportCatalogue() {
    let token = localStorage.getItem("userToken");
    let products = {
      products: this.props.catalogueStates.products.data
    };

    let uri = getApiCredentials.host + "/api/products/export";
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(products)
    };
    const reqInstance = new Request(uri, requestOptions);
    return fetch(reqInstance)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
      })
      .then(data => {
        var href = "data:attachment/csv," + data;
        console.log(href);
        var a = document.createElement("a");
        a.href = "data:attachment/csv," + data;
        a.target = "_Blank";
        a.download = "Export.csv";
        document.body.appendChild(a);
        a.click();

        return data;
      })
      .catch(err => console.log(err, "error111"));
  }

  renderImportEditBtns(param) {
    if (param === "CSV_IMPORT_ITEMS") {
      return (
        <div>
          <div
            className="collapse-btn"
            onClick={this.props.openProductAddingModal}
          >
            <i className="material-icons">add</i>
            <span className="collapse-btn-text">Add product</span>
          </div>
          <div className="collapse-btn">
            <i className="material-icons">open_in_browser</i>
            <Link to={"/import"} className="collapse-btn-text">
              Import
            </Link>
          </div>
          <div
            className="collapse-btn"
            onClick={() => this.changeBulkEditState()}
          >
            <i className="material-icons">mode_edit</i>
            <span className="collapse-btn-text">Bulk Edit</span>
          </div>
        </div>
      );
    } else if (param === "DOWNLOAD_CSV") {
      return (
        <div className="collapse-btn">
          <i className="material-icons">library_books</i>
          {/*<a href="../../../../assets/resources/CSV/catalogue.csv"
                       onClick={this.exportCatalogue}
                       className='collapse-btn-text' download>CSV</a>*/}
          <div onClick={this.exportCatalogue} className="collapse-btn-text">
            CSV
          </div>
        </div>
      );
    } else if (param === "ACCOUNT_GROUP") {
      return (
        <div>
          <div className="collapse-btn">
            <Link to="/profile">
              <i className="material-icons">account_circle</i>
              <span className="collapse-btn-text">My Profile</span>
            </Link>
          </div>
          <div className="collapse-btn">
            <i className="material-icons">https</i>
            <span className="collapse-btn-text">Change Password</span>
          </div>
          <div className="collapse-btn" onClick={this.logout}>
            <i className="material-icons">power_settings_new</i>
            <span className="collapse-btn-text">Logout</span>
          </div>
        </div>
      );
    }
  }

  render() {
    const { group, dropDownCallback, catalogueStates } = this.props;
    return (
      <div className="account-collapse">{this.renderImportEditBtns(group)}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    catalogueStates: state.catalogueReducer
  };
};

export default withRouter(connect(mapStateToProps)(DropDown));
