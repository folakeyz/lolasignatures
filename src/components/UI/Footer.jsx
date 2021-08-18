import React from 'react'
import styles from './styles.module.css'
import logo from '../../assets/lola.png'
import { Link } from 'react-router-dom'
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerGrid}>
                <div className={styles.footerContents}>
                    <img src={logo} alt="Lola Signatures" width="100px" /><br />
                    <small>Lola Signatures is a contemporary handcrafted beaded bags and accessories brand founded in 2021.
                        The journey began with the founder’s love for African fashion and style. We aim to serve
                        contemporary woman and men around the world. We employ the service of local artisans to produce our beaded bags and accessories.</small>
                </div>
                <div className={styles.footerContents}>
                    <h4>Quick Links</h4>
                    <ul>
                        <li> <Link to="/faq">FAQ</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link> </li>
                    </ul>

                </div>
                <div className={styles.footerContents}>
                    <h4>Social Handles</h4>
                    <a href="https://www.instagram.com/lolasignatures/"><FaFacebookSquare /></a>
                    <a href="https://www.instagram.com/lolasignatures/"><FaInstagram /></a>
                    <a href="https://www.instagram.com/lolasignatures/"><FaTwitterSquare /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer
