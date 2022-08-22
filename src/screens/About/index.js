import React from "react";
import { Route } from "react-router-dom";
import { Heroes, Footer } from "../../components";
import Navigation from "../../components/Navigation";

import styles from "./styles.module.css";
import bag from "../../assets/bag.jpg";
import bags from "../../assets/bag2.jpg";

const About = () => {
  return (
    <div className={styles.app}>
      <Route render={({ history }) => <Navigation history={history} />} />
      <div className={`${styles.productContainer} ${styles.padding}`}>
        <Heroes title="About Lola Signatures" />
        <div className={styles.about}>
          <div className={styles.contents}>
            <p>
              Lola Signatures is a contemporary handcrafted beaded bags and
              accessories brand founded in 2021. We specialize in the production
              of carefully designed high quality pieces crafted to be enjoyed
              for years. Each product is handmade and hand packaged by a team of
              skilled artisans passionate about developing their talents.
            </p>
            <br />
            <br />
            <h3>
              <b>SHIPPING AND DELIVERY </b>
            </h3>
            <p>
              Order on products with status “Available” will get shipped within
              1-3 days of purchase
              <br />
              Orders on products with status “Available on Preoder” will ship
              after we are done with production (7- 10 days)
              <br />
              All orders are shipped out through our courier partner DHL and the
              shipping cost is dependent on the location.
              <br />
              Every order will receive a tracking number via email once your
              order has shipped.
            </p>
            <br />
            <br />
            <h3>
              <b>REFUND POLICY</b>
            </h3>
            <p>
              We offer refund or exchange on items defective from our side or if
              you receive a wrong package different from your orders. We have a
              8-day return policy, which means you have 8 days after receiving
              your item to request a refund. To be eligible for a return, your
              item must be in the same condition that you received it.{" "}
            </p>

            <p>
              Custom designs (personalized orders) cannot be returned or
              exchanged.{" "}
            </p>
            <br />
            <br />
            <h3>
              <b>CUSTOM DUTIES AND TAXES</b>
            </h3>
            <p>
              Customs and import duties may be applied to International orders
              when the shipment reaches its destination. It is controlled by
              customs of the destination country and we have no influence over
              the process or the charges. Import charges are not included in the
              shipping fee because they are paid directly to customs of the
              destination country. Contact your local customs office for
              details.
            </p>
          </div>
          <div className={styles.contentsCircle}>
            <div className={styles.circle}>
              <img src={bag} alt="Lola Signatures" />
            </div>
            <div className={styles.circle2}>
              <img src={bags} alt="Lola Signatures" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
