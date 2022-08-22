import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  HomeScreen,
  ProductDetails,
  About,
  Cart,
  Categories,
  Contact,
  Login,
  Register,
  OrderScreen,
  PaymentScreen,
  PlaceOrderScreen,
  Products,
  ShippingScreen,
} from "./screens";

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
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
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
