import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Heroes,
  Navigation,
  ProductCard,
  Loading,
  Footer,
} from "../../components";
import styles from "./styles.module.css";
import Message from "../../components/Message";
import { listProducts } from "../../actions/productActions";
import { Route } from "react-router-dom";
import ProductPaginate from "../../components/ProductPaginate";

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
      <div className="productContainer">
        <Heroes title="All Product" />
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className={styles.productContainer}>
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        )}

        <div className="btnContainer">
          <ProductPaginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
