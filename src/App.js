import React, {useEffect} from "react";
import {BrowserRouter, Switch} from "react-router-dom";
import Signin from "./components/auth/Signin";
import Header from "./components/Singles/Header";
import PrivateRoute from "./components/HOC/PrivateRoute";
import PublicRoute from "./components/HOC/PublicRoute";
import {useDispatch} from "react-redux";
import {checking_start} from "./redux/actions/auth.actions";
import Signup from "./components/auth/Signup";
import Products from "./components/products";
import Categories from "./components/categories";
import Home from "./components/home";
import Orders from "./components/orders";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    checking_start(dispatch);
  }, [dispatch]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/products" component={Products} />
        <PrivateRoute exact path="/categories" component={Categories} />
        <PrivateRoute exact path="/orders" component={Orders} />
        <PublicRoute exact path="/signin" component={Signin} />
        <PublicRoute exact path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
