import React from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const isAuthentcated = localStorage.getItem("token");

  return isAuthentcated ? (
    <props.render />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
};

export default ProtectedRoute;
