import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.module.css'
import logo from '../../assets/lola.png'
import { RiPhoneFill } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { logout } from "../../actions/userActions";
import { HiOutlineMenu, HiX } from "react-icons/hi";


const Navigation = ({ history }) => {
    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const cat = useSelector((state) => state.cat);
    const { categories } = cat;

    const logoutHandler = () => {
        dispatch(logout());
    };
    // useEffect(() => {
    //     if (!userInfo) {
    //         history.push("/")
    //     }
    // }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push("/");
        }
    };
    const [expand, setExpand] = useState(false)

    const expandHandler = () => {
        setExpand(true)
    }
    const collapseHandler = () => {
        setExpand(false)
    }

    return (
        <div className={styles.navigation}>
            <div className={styles.miniNav}>

                <div className={styles.right}>
                    <small><RiPhoneFill /> 09028341873</small>
                    {userInfo ? (
                        <>
                            <Link to="/profile">{userInfo.name}</Link> |
                            <Link to="/#" onClick={logoutHandler}>Logout</Link>
                        </>
                    ) :
                        <>

                            <Link to="/login">Sign In</Link> |
                            <Link to="/register">Sign Up</Link>

                        </>
                    }
                </div>
            </div>
            <div className={styles.navbar}>
                <div className={`${styles.logo}`}>
                    <Link to="/">
                        <img src={logo} alt="Lola Signatures" />
                    </Link>
                </div>
                <div className={styles.bar}>{expand ? <span onClick={collapseHandler}><HiX /></span> : <span onClick={expandHandler}><HiOutlineMenu /></span>}</div>
                <div className={expand ? styles.mobileUrl : styles.url}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li> <Link to="/about">About Us</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/#">Categories</Link>
                            <ul>
                                {categories && categories.map((item, index) => (
                                    <li key={index}><Link to={`/category/${item.name}/${item._id}`}>{item.name}</Link></li>
                                ))}
                            </ul>
                        </li>
                        <li><Link to="/contact">Contact</Link> </li>
                        <li><Link to="/cart">
                            <AiOutlineShoppingCart /><i className="badge bg-danger">{cartItems.length}</i>Cart &nbsp;
                        </Link></li>
                    </ul>
                </div>

                <div className={`${styles.navCard}`}>
                    <form>
                        <input type="search" name="search" className="form-control" placeholder="Search for items" onChange={(e) => setKeyword(e.target.value)} onKeyUp={submitHandler} />
                    </form>


                </div>




            </div>
        </div>
    )
}

export default Navigation
