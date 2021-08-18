import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import Product from "../components/Products/Product";
import Grid from "../components/UI/Grid";
import styles from "./styles.module.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import { Route } from "react-router-dom";
import ProductPaginate from "../components/ProductPaginate";
import Footer from "../components/UI/Footer";

import Header from "../components/UI/Header";

const Products = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;
  const pageSize = 50;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, pageSize));
  }, [dispatch, keyword, pageNumber, pageSize]);
  return (
    <div className={styles.app}>
      <Route render={({ history }) => <Navigation history={history} />} />
      <Header title="Products" />
      <div className={styles.productContainer}>
        <h3>All Product</h3>
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

        <ProductPaginate
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ""}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Products;
