import React, { useState } from "react";
import banner from "../../assets/banner.png";
import ui from "./subscribe.module.css";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  return (
    <div className={ui.carousel}>
      <div className={ui.carouselGrid}>
        <div className={ui.cards}>
          <img src={banner} alt="Banner" />
        </div>
        <div className={`${ui.cards} ${ui.padding}`}>
          <h3>
            Join our email list! For periodic emails about new products and sales directly to your inbox!
          </h3>
          <form>
            <div className={ui.inputContainer}>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Email Address"
              />
            </div>
            <div className={ui.buttonContainer}>
              <input
                type="submit"
                className={`${ui.btn} ${ui.pink}`}
                value="JOIN"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
