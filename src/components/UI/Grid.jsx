import React from 'react'
import styles from './styles.module.css'
const Grid = (props) => {
    return (
        <div className={styles.cards}>
            <div className={styles.grid}>
                {props.children}
            </div>
        </div>
    )
}

export default Grid
