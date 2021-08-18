import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import Hero from "../components/Carousel";
import Product from "../components/Products/Product";
import Grid from "../components/UI/Grid";
import styles from "./styles.module.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import { Route } from "react-router-dom";
import Paginate from "../components/Paginate";
import Footer from "../components/UI/Footer";
import Box from "../components/Box";
import Testimonal from "../components/UI/Testimonial";
import { getCat } from "../actions/categoryActions";
//import Alert from 'react-popup-alert'

const HomeScreen = ({ match }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    dispatch(getCat());
    setShow(true);
  }, [dispatch, keyword, pageNumber]);

  const close = () => {
    setShow(false);
  };
  return (
    <div className={styles.app}>
      <Route render={({ history }) => <Navigation history={history} />} />
      <div className={show ? styles.popup : styles.hide}>
        <div className={styles.popup_inner}>
          <h3>
            Subscribe to our newsletter now, and get super exclusive tips on
            brand building!{" "}
          </h3>
          <div className={styles.row}>
            <form>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Enter Email Address"
                />
              </div>
              <div className={styles.buttonContainer}>
                <input
                  type="submit"
                  className="form-control btn btn-warning "
                  value="Subscribe Now"
                />
              </div>
            </form>
          </div>
          <button onClick={close} className="form-control btn btn-danger">
            Close Modal
          </button>
        </div>
      </div>
      <Hero />
      <Box />
      <div className={styles.productContainer}>
        <h3>Featured Product</h3>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Grid>
            {products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </Grid>
        )}
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
      </div>
      <Testimonal />
      <Footer />
    </div>
  );
};

export default HomeScreen;
