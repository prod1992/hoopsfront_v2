import React from "react";
import getApiCredentials from "../constants/api";
require("whatwg-fetch");

const User = {};

User.loginRegister = (userData, uri) => {
  const reqUri = getApiCredentials.host + uri;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(userData)
  };
  const reqInstance = new Request(reqUri, requestOptions);
  return fetch(reqInstance)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => {
      //Fetched user register data is stored
      // console.log(data, 'data');
      return data;
    })
    .catch(err => console.log(err.message, "error111"));
};
User.logout = token => {
  let uri = getApiCredentials.host + "/api/auth/logout";
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token
    }
  };
  const reqInstance = new Request(uri, requestOptions);
  return fetch(reqInstance)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.json();
      }
    })
    .then(data => {
      return data;
    })
    .catch(err => console.log(err, "error"));
};
User.getUser = token => {
  let uri = getApiCredentials.host + "/api/auth/user";
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token
    }
  };
  const reqInstance = new Request(uri, requestOptions);
  return fetch(reqInstance)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.json();
      }
    })
    .then(data => {
      return data;
    })
    .catch(err => console.log(err, "error"));
};

export default User;
