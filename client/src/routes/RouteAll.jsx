import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { Loader } from "semantic-ui-react";

function RouteAll({ component, path, exact }) {
  const { isAuthenticated,loading } = useSelector((state) => state.auth);
  if(loading) return <Loader/>
  return (
    <>
      {isAuthenticated ? (
        <Route component={component} path={path} exact={exact} />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default RouteAll;
