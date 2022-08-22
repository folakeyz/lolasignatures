import React, { useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { Navigation, Footer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import style from "./styles.module.css";
import styles from "../ui.module.css";
import { Alert, AlertIcon, Button, Box } from "@chakra-ui/react";

const Cart = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    const checkoutHandler = () => {
        history.push("/login?redirect=shipping");
    };
    return (
        <div className={style.app}>
            <Route render={({ history }) => <Navigation history={history} />} />
            <div className="productContainer">
                <div className={styles.content}>
                    {cartItems.length === 0 && (
                        <Alert>
                            <AlertIcon status="error" />
                            No Items in Cart <Link to="/shop">Go Back</Link>
                        </Alert>
                    )}
                    <div className={styles.cartPageGrid}>
                        <div className={styles.section}>
                            {cartItems &&
                                cartItems.map((item) => (
                                    <div className={styles.cart} key={item.product}>
                                        <div className={styles.cartGrid}>
                                            <div className={`${styles.items} ${styles.cartImg}`}>
                                                <img src={`${item.image}`} alt={item.course} />
                                            </div>
                                            <div className={styles.items}>
                                                <p>{item.name}</p>
                                            </div>
                                            <div className={styles.items}>
                                                <p>$ {item.price}</p>
                                            </div>
                                            <div className={styles.items}>
                                                <Button
                                                    colorScheme="red"
                                                    size="sm"
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                >
                                                    Remove Item
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className={styles.section}>
                            <div className={styles.sectionItems}>
                                <Box w="100%" p={4}>
                                    <h2>
                                        Subtotal (
                                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                                    </h2>
                                </Box>

                                <Box w="100%" p={4}>
                                    Total: $&nbsp;
                                    {cartItems
                                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                                        .toFixed(2)}
                                </Box>
                                <Button
                                    type="button"
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                    colorScheme="yellow"
                                    isFullWidth
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
