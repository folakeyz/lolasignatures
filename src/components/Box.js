import React from "react";
import styles from "./styles.module.css";
import { BsFillShieldFill, BsClockHistory, BsWallet } from "react-icons/bs";

const Box = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.icon}>
            <span>
              <BsClockHistory />
            </span>
          </div>
          <div className={styles.text}>
            <h3>You can count on us for:</h3>
            <p>
              Fast Turnaround Within Days Your order gets to you within 3-7
              working days.
            </p>
          </div>
        </div>
        <div className={styles.card2}>
          <div className={styles.icon}>
            <span>
              <BsFillShieldFill />
            </span>
          </div>
          <div className={styles.text}>
            <h3>100% Top Quality</h3>
            <p>
              Only the finest materials, machines and people will be involved in
              fulfilling your order.
            </p>
          </div>
        </div>
        <div className={styles.card3}>
          <div className={styles.icon}>
            <span>
              <BsWallet />
            </span>
          </div>
          <div className={styles.text}>
            <h3>Affordable Services</h3>
            <p>
              All products are adequately priced to ensure you get value for
              your money at all times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
