import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { ListGroup, Form, Button, Card } from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import styles from "./styles.module.css";
import { FaTrash } from "react-icons/fa";
import Header from "../components/UI/Header";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <div className={styles.app}>
      <Route render={({ history }) => <Navigation history={history} />} />
      <Header title="Shopping Cart" />
      <div>
        <div className={styles.cartGrid}>
          <div className={styles.contents}>
            {cartItems.length === 0 ? (
              <Message>
                Your Cart is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <div className={styles.contents}>
                {cartItems.map((item) => (
                  <div key={item.product} className={styles.cart}>
                    <div className={styles.cartItemsGrid}>
                      <div className={styles.cartItems}>
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div
                        className={`${styles.cartItems} ${styles.cartPadding}`}
                      >
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div
                        className={`${styles.cartItems} ${styles.cartPadding}`}
                      >
                        &#x20A6;{item.price}
                      </div>
                      <div
                        className={`${styles.cartItems} ${styles.cartPadding}`}
                      >
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                      <div
                        className={`${styles.cartItems} ${styles.cartPadding}`}
                      >
                        <Button
                          type="button"
                          variant="danger"
                          onClick={(e) => removeFromCartHandler(item.product)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className={styles.back}>
                  <Link className="btn btn-light my-3" to="/">
                    Go Back
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className={styles.contents}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                  </h2>
                  &#x20A6;&nbsp;
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block btn-dark"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
