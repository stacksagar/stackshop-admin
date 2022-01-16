import React from "react";
import {useSelector} from "react-redux";
import {Route, Redirect} from "react-router-dom";
const PrivateRoute = ({component: Component, ...props}) => {
  const auth = useSelector((state) => state.auth);
  if (!auth.authenticated) return <Redirect to="/signin" />;
  return <Route {...props} component={Component} />;
};

export default PrivateRoute;
