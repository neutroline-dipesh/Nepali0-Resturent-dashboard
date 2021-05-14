import React from "react";
import { Redirect } from "react-router-dom";

const logout = () => {
  localStorage.removeItem("token");
  const token = localStorage.getItem("token");

  let loggedIn = true;
  if (token == null) {
    loggedIn = false;
  }

  if (loggedIn === false) {
    return <Redirect to="/" />;
  }
};

export default logout;
