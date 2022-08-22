import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartActions";
import CheckoutSteps from "../../components/UI/CheckoutSteps";
import Navigation from "../../components/Navigation";
import styles from "./styles.module.css";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <div className={styles.app}>
        <Route render={({ history }) => <Navigation history={history} />} />
        <div className={styles.forms}>
          <CheckoutSteps step1 step2 step3 />
          <h4 className="alert alert-dark">Payment Method</h4>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="paymentMethod">
              <Form.Label as="legend">Select Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="Credit Card"
                  id="Card"
                  name="paymentMethod"
                  value="Credit Card"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                  type="radio"
                  label="Pay on Delivery"
                  id="Pay on Delivery"
                  name="paymentMethod"
                  value="Pay on Delivery"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>

            <Button type="submit" variant="dark" className="form-control">
              Continue
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
