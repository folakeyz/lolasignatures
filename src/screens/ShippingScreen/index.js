import React, { useState, useEffect, Suspense } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  saveShippingAddress,
  savePaymentMethod,
  removeFromCart,
} from "../../actions/cartActions";
import { Navigation, Footer, Heroes, Loading } from "../../components";
import style from "./styles.module.css";
import styles from "../ui.module.css";
import { BiTrash } from "react-icons/bi";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { getCountries } from "../../actions/deliveryActions";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const getDelivery = useSelector((state) => state.getDelivery);
  const { countries = [] } = getDelivery;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [fee, setFee] = useState(shippingAddress.fee);
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("select Payment Method");
    } else {
      dispatch(
        saveShippingAddress({ address, city, postalCode, country, fee })
      );
      dispatch(savePaymentMethod({ paymentMethod }));
      history.push("/placeorder");
    }
  };

  const remove = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const countryHandler = (e) => {
    const info = countries.find((x) => x.country === e.target.value);
    setCountry(info.country);
    setFee(info.fee);
  };

  return (
    <div className={style.app}>
      <Route render={({ history }) => <Navigation history={history} />} />

      <div className={`productContainer`}>
        <Heroes title="Shipping Info" />
        <Suspense fallback={<Loading />}>
          <div className={`${styles.content} ${styles.customBg}`}>
            <div className={styles.orderGrid}>
              <div className={styles.oCards}>
                <div className={styles.orderTitle}>Shipping Information</div>
                <form onSubmit={submitHandler}>
                  <div className={styles.formGrid}>
                    <div className={styles.orderContainer}>
                      <FormControl id="city">
                        <FormLabel>City</FormLabel>
                        <Input
                          type="text"
                          onChange={(e) => setCity(e.target.value)}
                          value={city}
                        />
                      </FormControl>
                    </div>
                    <div className={styles.orderContainer}>
                      <FormControl id="code">
                        <FormLabel>PostalCode</FormLabel>
                        <Input
                          type="text"
                          onChange={(e) => setPostalCode(e.target.value)}
                          value={postalCode}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className={styles.orderContainer}>
                    <FormControl id="code">
                      <FormLabel>Country</FormLabel>
                      <Select onChange={countryHandler} value={country}>
                        <option disabled>Select Country</option>
                        {countries.map((item, i) => (
                          <option key={i} value={item.country}>
                            {item.country}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={styles.orderContainer}>
                    <FormControl id="address">
                      <FormLabel>Address</FormLabel>
                      <Input
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />
                    </FormControl>
                  </div>

                  <div className={styles.orderTitle}>Payment Method</div>
                  <div className={styles.orderContainer}>
                    <div className="inputGroup">
                      <input
                        id="radio1"
                        name="radio"
                        type="radio"
                        value="PayPal"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="radio1">PayPal</label>
                    </div>
                  </div>
                  <div className={styles.orderContainer}>
                    <div className="inputGroup">
                      <input
                        id="radio2"
                        name="radio"
                        type="radio"
                        value="Flutterwave"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label htmlFor="radio2">FlutterWave</label>
                    </div>
                  </div>

                  <div className={styles.orderContainerSm}>
                    <FormControl>
                      <Button type="submit" isFullWidth className={styles}>
                        Proceed
                      </Button>
                    </FormControl>
                  </div>
                </form>
              </div>
              {/* Client Order */}
              <div className={styles.myOrders}>
                <div className={styles.orderTitle}>Order Items</div>
                {cartItems &&
                  cartItems.map((item) => (
                    <div className={styles.cart} key={item._id}>
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
                            colorScheme="teal"
                            size="sm"
                            onClick={() => remove(item.product)}
                            isFullWidth
                          >
                            <BiTrash />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default ShippingScreen;
