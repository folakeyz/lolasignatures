import React, { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigation,
  Hero,
  ProductCard,
  Loading,
  Footer,
} from "../../components";
import styles from "./styles.module.css";
import Message from "../../components/Message";
import { listProducts } from "../../actions/productActions";
import { Link, Route } from "react-router-dom";
import Paginate from "../../components/Paginate";
import Testimonal from "../../components/UI/Testimonial";
import { getCat } from "../../actions/categoryActions";
import Subscribe from "../../components/UI/Subscribe";
import { BsChevronCompactDown } from "react-icons/bs";
import { Center } from "@chakra-ui/react";
//import Alert from 'react-popup-alert'

const HomeScreen = ({ match }) => {
  // const [show, setShow] = useState(false);
  // const [email, setEmail] = useState("");

  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [], page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    dispatch(getCat());
    // setShow(true);
  }, [dispatch, keyword, pageNumber]);

  // const close = () => {
  //   setShow(false);
  // };
  return (
    <div className={styles.app}>
      <Route render={({ history }) => <Navigation history={history} />} />
      {/* <div className={show ? styles.popup : styles.hide}>
        <div className={styles.popup_inner}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={close} className="btn btn-danger">
              x
            </button>
          </div>

          <h3>
            Join our email list! For periodic emails about new products and
            sales directly to your inbox!
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
                  value="JOIN"
                />
              </div>
            </form>
          </div>
        </div>
      </div> */}
      <Hero />
      {/* <Box /> */}
      <Suspense fallback={<Loading />}>
        <div className={styles.productContainer}>
          {/* <div className="center">
          <div className="headingsection">
            <span className="subheading">OUR PRODUCT</span>
          </div>
        </div> */}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}

              <div className="btnContainer">
                <Center>
                  <Link to="/products" className={`lolabtn pink`}>
                    View More <BsChevronCompactDown />
                  </Link>
                </Center>
              </div>
              <div className="btnContainer">
                <Paginate
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </>
          )}
        </div>
        <Testimonal />
      </Suspense>

      <Subscribe />
      <Footer />
    </div>
  );
};

export default HomeScreen;
