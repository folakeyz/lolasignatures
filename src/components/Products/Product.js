import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import styles from "./styles.module.css";
import { Row, Col } from "react-bootstrap";
import { FaShoppingBag, FaEye } from "react-icons/fa";

const Product = ({ product }) => {
  return (
    <div className={styles.pcard}>
      <div className={styles.cardImg}>
        <Link to={`/product/${product._id}`}>
          <img src={product.image && product.image[0]} alt={product.name} />
        </Link>
      </div>
      <div className={styles.cardText}>
        <Link to={`/product/${product._id}`}>
          <h5>{product.name}</h5>
        </Link>
        <small>{product.description.substring(0, 100)}...</small>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <h4>&#x20A6; {product.price}</h4>
        <Row>
          <Col>
            <Link
              to={`/product/${product._id}`}
              className="btn btn-light"
              style={{ fontSize: "13px" }}
            >
              <FaEye /> View Details
            </Link>
          </Col>
          <Col>
            <Link
              to={`/cart/${product._id}?qty=1`}
              className="btn btn-success text-light"
              style={{ fontSize: "13px" }}
            >
              <FaShoppingBag /> Add to Cart
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Product;
