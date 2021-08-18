import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../components/Navigation";
import Product from "../components/Products/Product";
import Grid from "../components/UI/Grid";
import styles from "./styles.module.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Route } from "react-router-dom";
import ProductPaginate from "../components/ProductPaginate";
import Footer from "../components/UI/Footer";

import Header from "../components/UI/Header";
import { getCatProduct } from "../actions/categoryActions";

const Categories = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;
  const pageSize = 50;

  const name = match.params.name;
  const id = match.params.id;

  const dispatch = useDispatch();

  const catProduct = useSelector((state) => state.catProduct);
  const { loading, error, products, page, pages } = catProduct;

  useEffect(() => {
    dispatch(getCatProduct(keyword, pageNumber, pageSize, id));
  }, [dispatch, keyword, pageNumber, pageSize, id]);
  return (
    <div className={styles.app}>
      <Route render={({ history }) => <Navigation history={history} />} />
      <Header title={name} />
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

export default Categories;
