import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function RouteGuest({ component, path, exact }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      { !isAuthenticated ? (
        <Route component={component} path={path} exact={exact} />
      ) : (
        <Redirect to="/courses"/>
      )}
    </>
  );
}

export default RouteGuest;
