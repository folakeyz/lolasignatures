import React, { useState } from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

const Testimonal = () => {
    const [email, setEmail] = useState("")
    return (
        <div className={styles.testimonial}>
            <div className={styles.testImage}>
                <h1>Testimonials</h1>
            </div>
            <div className={styles.grid}>
                <div className={styles.testCard}>
                    <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
                    <small><b>John Doe</b></small>
                </div>
                <div className={styles.testCard}>
                    <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
                    <small><b>Jane Doe</b></small>
                </div>
                <div className={styles.testCard}>
                    <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
                    <small><b>John Doe</b></small>
                </div>
                <div className={styles.testCard}>
                    <p>Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
                    <small><b>John Doe</b></small>
                </div>
            </div>
            <div className={`text-center ${styles.testContact}`}>
                <h3>Subscribe to our newsletter now, and get super exclusive tips on brand building! </h3>
                <div className={styles.row}>
                    <form>
                        <div className={styles.inputContainer}>
                            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Email Address" />
                        </div>
                        <div className={styles.buttonContainer}>
                            <input type="submit" className="form-control btn btn-warning " value="Subscribe Now" />
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Testimonal
