import React, { useState } from "react";
import { Route } from "react-router-dom";
import Navigation from "../../components/Navigation";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import { register } from "../../actions/userActions";
import { Heroes, Loading, Footer } from "../../components";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";

const Contact = ({ history }) => {
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const [name, setName] = useState(userInfo && userInfo.name);
  const [email, setEmail] = useState(userInfo && userInfo.email);
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [mobile, setMobile] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, msg, subject));
  };

  return (
    <div className={styles.app}>
      <Route render={({ history }) => <Navigation history={history} />} />
      <div className="productContainer">
        <Heroes title="Get-in-Touch" />
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loading />}
        <div className={styles.formContainer}>
          <div className={styles.forms}>
            <form onSubmit={submitHandler}>
              <div className={styles.formBox}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.formBox}>
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.formBox}>
                <label>Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className={styles.formBox}>
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="Enter Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className={styles.formBox}>
                <label>Subject</label>
                <textarea
                  rows={3}
                  placeholder="Enter Message"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                ></textarea>
              </div>
              <div className="btnContainer">
                <button type="submit" className="lolabtn pink">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className={styles.image}>
            <h2>Contact</h2>
            <p>131 Boluwaduro Sawmill Allahu lateef, Ede, Osun state</p>
            <br />
            <a href="tel:+234">+234</a>

            <div className={styles.icons}>
              <a href="http://www.facebook.com/lolasignatures">
                <FaFacebookSquare />
              </a>
              <a href="https://www.instagram.com/lolasignatures/">
                <FaInstagram />
              </a>
              <a href="http://www.twitter.com/lolasignatures/">
                <FaTwitterSquare />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
