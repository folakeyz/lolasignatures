import React from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerCard}>
                <div className={styles.cards}>
                    <small>Lola Signatures is a contemporary handcrafted beaded bags and accessories brand founded in 2021.
                        The journey began with the founder’s love for African fashion and style. We aim to serve
                        contemporary woman and men around the world. We employ the service of local artisans to produce our beaded bags and accessories.</small><br /><br />
                    <>
                        <h4>Social Handles</h4>
                        <div className={styles.icons}>
                            <a href="http://www.facebook.com/lolasignatures"><FaFacebookSquare /></a>
                            <a href="https://www.instagram.com/lolasignatures/"><FaInstagram /></a>
                            <a href="http://www.twitter.com/lolasignatures/"><FaTwitterSquare /></a>
                        </div>

                    </>

                </div>
                <div className={styles.cards}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li> <Link to="/faq">FAQ</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link> </li>
                        <li><Link to="/cart">Cart</Link> </li>
                    </ul>

                </div>
                <div className={styles.cards}>
                    <h4>Help</h4>
                    <ul>
                        <li> <Link to="/faq">Order Tracking</Link></li>
                        <li><Link to="/about">Privacy Policy</Link></li>
                        <li><Link to="/contact">Terms & Conditions</Link> </li>
                    </ul>

                </div>
                <div className={styles.cards}>
                    <h4>Company</h4>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link> </li>
                    </ul>
                </div>
            </div>

            <div className={styles.rights}>&copy; 2022 Lola Signatures</div>
        </div>
    )
}

export default Footer