import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Header from "../components/UI/Header";
import Navigation from "../components/Navigation";
import styles from "./styles.module.css";
import Footer from "../components/UI/Footer";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";

const ContactScreen = ({ history }) => {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const [name, setName] = useState(userInfo && userInfo.name);
  const [email, setEmail] = useState(userInfo && userInfo.email);
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, msg, subject));
  };

  return (
    <div className={styles.app}>
      <Route render={({ history }) => <Navigation history={history} />} />
      <Header title="Contact Us" />
      <div className={styles.forms}>
        <h4 className="text-center">Get-in-Touch</h4>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Mobile"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Button type="submit" variant="dark" className="form-control">
            Send Message
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default ContactScreen;
