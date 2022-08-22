import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { Navigation, Loading } from "../../components";
import Message from "../../components/Message";
import Rating from "../../components/Products/Rating";
import styles from "./styles.module.css";
import SliderImage from "react-zoom-slider";
import {
  listProductDetails,
  createProductReview,
} from "../../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview, product]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  const data =
    product &&
    product.image &&
    product.image.map((item) => ({
      image: `https://admin.lolasignatures.com${item}`,
      text: product.name,
    }));

  const info = [
    {
      image: "https://admin.lolasignatures.com/upload/1.jpeg",
      text: "loading",
    },
  ];
  return (
    <>
      <div>
        <Route render={({ history }) => <Navigation history={history} />} />
        <div className={styles.appContainer}>
          {/* <div className={styles.back}>
            <Link className="btn btn-light my-3" to="/">
              Go Back
            </Link>
          </div> */}
          {loading ? (
            <Loading text="loading..." />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className={styles.productContainer}>
              <div className={styles.imageSlider}>
                <SliderImage
                  data={data === undefined ? info : data}
                  showDescription={true}
                  direction="right"
                />
              </div>
              <div className={styles.productDesc}>
                <div
                  className={`${styles.status} ${
                    product.countInStock > 0 ? styles.green : styles.red
                  }`}
                >
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </div>
                <h2>{product.name}</h2>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                <h4>&#x24;{product.price}</h4>
                <p>Description:{product.description}</p>

                <div className={styles.formGroup}>
                  {product.countInStock > 0 && (
                    <>
                      <div className={styles.formContainer}>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={styles.formContainer}>
                        <Button
                          onClick={addToCartHandler}
                          className="btn-block btn-dark form-control"
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          Add To Cart
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* </div> */}
          <div className={styles.reviewContainer}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}

            <div className={styles.reviews}>
              {product.reviews.map((review) => (
                <div key={review._id} className={styles.reviewCard}>
                  <h3>
                    <b>{review.name}</b>
                  </h3>
                  <p>{review.comment}</p>
                  <Rating value={review.rating} />
                  <span>{review.createdAt.substring(0, 10)}</span>
                </div>
              ))}
            </div>
            <div>
              <h2>Write a Customer Review</h2>
              {successProductReview && (
                <Message variant="success">
                  Review submitted successfully
                </Message>
              )}
              {loadingProductReview && <Loading text="loading..." />}
              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingProductReview}
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review{" "}
                </Message>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
