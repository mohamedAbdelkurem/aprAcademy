import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { Loader } from "semantic-ui-react";
function RouteAdmin({ component, path, exact }) {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <Loader size="big" active />
      ) : !isAuthenticated && !user ? (
        <Redirect to="/login" />
      ) : user && isAuthenticated && !loading && user.role !== "admin" ? (
        <Redirect to="/" />
      ) : (
        <Route
          component={component}
          path={path}
          exact={exact}
          key={Date.now()}
        />
      )}
    </>
  );
}

export default RouteAdmin;
