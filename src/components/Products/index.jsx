import React from 'react'
import styles from './product.module.css'
import { Link } from 'react-router-dom'
import { GiShoppingBag } from "react-icons/gi";
import { FiHeart } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import Rating from './Rating';
const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} className={styles.card}>
            <div>
                <div className={styles.image}>
                    <img src={`https://admin.lolasignatures.com${product.image[0]}`} alt={product.name} />
                </div>
                <div className={styles.btnContainer}>
                    <Link
                        to={`/product/${product._id}`}
                        style={{ fontSize: "15px", textAlign: "center" }}
                        className={`${styles.btn} ${styles.gray}`}
                    >
                        <div className={`${styles.btns} ${styles.white}`}><AiOutlineEye /></div></Link>
                    <div className={`${styles.btns} ${styles.pink}`}><FiHeart /></div>
                    <Link
                        to={`/cart/${product._id}?qty=1`}

                    ><div className={`${styles.btns} ${styles.yellow}`}><GiShoppingBag /></div></Link>
                </div>
                <div className={styles.text}>
                    <h4>{product.name}</h4>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} center={true} />
                    <h5><b>${product.price}</b></h5>

                </div>
            </div>
        </Link>
    )
}

export default ProductCard