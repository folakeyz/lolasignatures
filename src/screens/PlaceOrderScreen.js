import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/UI/CheckoutSteps";
import Navigation from "../components/Navigation";
import styles from "./styles.module.css";
import Header from "../components/UI/Header";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice < 500 ? 0 : 500);
  cart.taxPrice = addDecimals(Number((0.015 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <div className={styles.app}>
        <Route render={({ history }) => <Navigation history={history} />} />
        <Header title="Order Summary" />
        <CheckoutSteps step1 step2 step3 step4 />
        <div className={styles.cartGrid}>
          <div className={styles.contents}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h6>Shipping</h6>
                <p>
                  <strong>Address:</strong>
                  {cart.shippingAddress.address},{cart.shippingAddress.city},
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country},
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h6>Payment Method</h6>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <h6>Order Items</h6>
                {cart.cartItems.length === 0 ? (
                  <Message>Your Cart is Empty</Message>
                ) : (
                  <div>
                    {cart.cartItems.map((item, index) => (
                      <div key={index} className={styles.cart}>
                        <div className={styles.cartItemsGrid}>
                          <div className={styles.cartItems}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </div>
                          <div className={styles.cartItems}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div className={styles.cartItems}>
                            {item.qty} x &#x20A6;{item.price} = $
                            {item.qty * item.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className={styles.contents}>
            <Card>
              <ListGroup vaaint="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>&#x20A6;{cart.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>&#x20A6;{cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>&#x20A6;{cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>&#x20A6;{cart.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message varaint="danger">{error}</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block form-control btn-dark"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
