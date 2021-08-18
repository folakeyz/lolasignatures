import React from "react";
import { Link, Route } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/UI/Footer";
import Header from "../components/UI/Header";
import styles from "./styles.module.css";

const AboutUs = () => {
  return (
    <div className={styles.app}>
      <Route render={({ history }) => <Navigation history={history} />} />
      <Header title="About Us" />
      <div className={`${styles.productContainer} ${styles.padding}`}>
        <p>
          Lola Signatures is a contemporary handcrafted beaded bags and
          accessories brand founded in 2021. The journey began with the
          founder’s love for African fashion and style. We aim to serve
          contemporary woman and men around the world. We employ the service of
          local artisans to produce our beaded bags and accessories.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
