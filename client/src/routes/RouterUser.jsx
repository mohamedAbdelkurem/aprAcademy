import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import Forms from "../shared/Forms";
function RouteUser({ component, path, exact }) {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <Loader size="big" active />
      ) : !isAuthenticated && !user ? (
        <Redirect to="/login" />
      ) : user && isAuthenticated && !loading && user.role === "admin" ? (
        <Redirect to="/admin" />
      ) : user && isAuthenticated && !loading && user.role === "teacher" ? (
        <Redirect to="/questions" />
      ) : user && isAuthenticated && !loading && (!user.type || !user.level) ? (
        <Route component={Forms} path={path} exact={exact} key={Date.now()} />
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

export default RouteUser;
