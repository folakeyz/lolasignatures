import React from 'react'
import styles from './styles.module.css'
const Header = (props) => {
    return (
        <div className={`text-left ${styles.testContact}`}>
            <h1>{props.title}</h1>
        </div>

    )
}

export default Header
