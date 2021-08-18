import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutUs from "./screens/AboutUs";
import CartScreen from "./screens/CartScreen";
import Categories from "./screens/Categories";
import ContactScreen from "./screens/ContactScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import Products from "./screens/Products";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/search/:keyword" exact component={HomeScreen} />
          <Route
            path="/search/:keyword?/page/:pageNumber"
            exact
            component={HomeScreen}
          />
          <Route path="/page/:pageNumber" exact component={HomeScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/contact" component={ContactScreen} />
          <Route path="/about" component={AboutUs} />
          <Route path="/products" component={Products} />
          <Route path="/products/search/:keyword" exact component={Products} />
          <Route
            path="/products/search/:keyword?/page/:pageNumber"
            exact
            component={Products}
          />
          <Route path="/products/page/:pageNumber" exact component={Products} />
          <Route path="/category/:name/:id" exact component={Categories} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
