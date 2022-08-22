import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/orderActions";
import { Navigation, Footer, Heroes } from "../../components";
import style from "../styles.module.css";
import styles from "../ui.module.css";
import { Box, Button, Alert } from "@chakra-ui/react";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  //calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = parseInt(shippingAddress.fee);
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
        paymentMethod: cart.paymentMethod.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <div className={style.app}>
        <Route render={({ history }) => <Navigation history={history} />} />
        <div className="productContainer">
          <Heroes title="Place Order" />
          <div className={`${styles.content} ${styles.customBg}`}>
            <div className={styles.orderGrid}>
              <div className={styles.oCards}>
                <div className={styles.orderTitle}>Shipping Address</div>
                <Box>
                  <p>
                    <b>Address:</b> {cart.shippingAddress.address}
                  </p>
                  <p>
                    <b>City: </b>
                    {cart.shippingAddress.city}
                  </p>
                  <p>
                    <b>Postal Code: </b>
                    {cart.shippingAddress.postalCode}
                  </p>
                  <p>
                    <b>Country: </b>
                    {cart.shippingAddress.country}
                  </p>
                </Box>

                <div className={styles.orderTitle}>Payment Method</div>

                <p>
                  <b>
                    {cart.paymentMethod && cart.paymentMethod.paymentMethod}
                  </b>
                </p>
                <div className={styles.myOrders}>
                  <div className={styles.orderTitle}>Order Items</div>
                  {cart.cartItems.length === 0 ? (
                    <Alert>Your Cart is Empty</Alert>
                  ) : (
                    <div>
                      {cart.cartItems.map((item, index) => (
                        <div className={styles.cart} key={index}>
                          <div className={styles.cartGrid}>
                            <div
                              className={`${styles.items} ${styles.cartImg}`}
                            >
                              <img src={`${item.image}`} alt={item.course} />
                            </div>
                            <div className={styles.items}>
                              <p>{item.name}</p>
                            </div>
                            <div className={styles.items}>
                              {item.qty} x ${item.price} = $
                              {item.qty * item.price}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.myOrders}>
                <div className={styles.orderTitle}>Order Summary</div>
                <div className={styles.priceBox}>
                  <div className={styles.priceGrid}>
                    <div>
                      <h3>Items</h3>
                    </div>
                    <div>
                      <p>${cart.itemsPrice}</p>
                    </div>
                    <h3>Shipping</h3>
                    <p>${cart.shippingPrice}</p>

                    <h3>Tax</h3>
                    <p>${cart.taxPrice}</p>

                    <h3>Total</h3>
                    <p>${cart.totalPrice}</p>
                  </div>
                  <br />
                  <Box>{error && <Alert varaint="danger">{error}</Alert>}</Box>
                  <Box>
                    <Button
                      type="button"
                      colorScheme="teal"
                      disabled={cart.cartItems === 0}
                      onClick={placeOrderHandler}
                      isFullWidth
                    >
                      Place Order
                    </Button>
                  </Box>
                  <br />
                  <Box>
                    <Link to="/shop/shipping">
                      <Button isFullWidth>Go Back</Button>
                    </Link>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PlaceOrderScreen;
