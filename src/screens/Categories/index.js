import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Navigation";
import styles from "./styles.module.css";
import Message from "../../components/Message";
import { Route } from "react-router-dom";
import ProductPaginate from "../../components/ProductPaginate";
import { getCatProduct } from "../../actions/categoryActions";
import { Heroes, Loading, ProductCard, Footer } from "../../components";

const Categories = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;
  const pageSize = 50;

  const id = match.params.id;
  const name = match.params.name;

  const dispatch = useDispatch();

  const catProduct = useSelector((state) => state.catProduct);
  const { loading, error, products, page, pages } = catProduct;

  useEffect(() => {
    dispatch(getCatProduct(keyword, pageNumber, pageSize, id));
  }, [dispatch, keyword, pageNumber, pageSize, id]);
  return (
    <div className={styles.app}>
      <Route render={({ history }) => <Navigation history={history} />} />
      <div className="productContainer">
        <Heroes title={name} />
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

export default Categories;
