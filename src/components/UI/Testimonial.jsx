import React from 'react'
import styles from './styles.module.css'
import image from '../../assets/test.jpg'
import Rating from '../Products/Rating'

const Testimonal = () => {
    return (
        <div className={styles.testimonial}>
            <div className="center">
                <div className="headingsection">
                    <span className="subheading"><h1>OUR CLIENT'S SAYS</h1></span>
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.testCard}>
                    <div className={styles.circle}>
                        <img src={image} alt="Testimonials" />
                    </div>
                    <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
                    <Rating value="5" />
                    <small><b>Horspiroll</b></small>
                </div>
                <div className={styles.testCard}>
                    <div className={styles.circle}>
                        <img src={image} alt="Testimonials" />
                    </div>
                    <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
                    <Rating value="5" />
                    <small><b>Horspiroll</b></small>
                </div>
                <div className={styles.testCard}>
                    <div className={styles.circle}>
                        <img src={image} alt="Testimonials" />
                    </div>
                    <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
                    <Rating value="5" />
                    <small><b>Horspiroll</b></small>
                </div>
                <div className={styles.testCard}>
                    <div className={styles.circle}>
                        <img src={image} alt="Testimonials" />
                    </div>
                    <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
                    <Rating value="5" />
                    <small><b>Horspiroll</b></small>
                </div>
            </div>
        </div>
    )
}

export default Testimonal
