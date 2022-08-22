import React from 'react'
import styles from './styles.module.css'
const Heroes = ({ title }) => {
    return (
        <div className={styles.hero}>{title}</div>
    )
}

export default Heroes