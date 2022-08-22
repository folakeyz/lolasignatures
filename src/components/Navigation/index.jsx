import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.module.css'
import logo from '../../assets/lola.png'
import { logout } from "../../actions/userActions";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { GiShoppingBag } from "react-icons/gi";
import { FiSearch, FiHeart } from "react-icons/fi";


const Navigation = ({ history }) => {
    // const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const cat = useSelector((state) => state.cat);
    const { categories } = cat;

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);

    const logoutHandler = () => {
        dispatch(logout());
    };
    // useEffect(() => {
    //     if (!userInfo) {
    //         history.push("/")
    //     }
    // }, [history, userInfo])

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     if (keyword.trim()) {
    //         history.push(`/search/${keyword}`);
    //     } else {
    //         history.push("/");
    //     }
    // };
    const [expand, setExpand] = useState(false)


    const expandHandler = () => {
        setExpand(true)
    }
    const collapseHandler = () => {
        setExpand(false)
    }

    return (
        <div className={scroll ? styles.navigationActive : styles.navigation}>
            <div className={`${styles.logo}`}>
                <Link to="/">
                    <img src={logo} alt="Lola Signatures" />
                </Link>
                <div className={styles.bar}>{expand ? <span onClick={collapseHandler}><HiX /></span> : <span onClick={expandHandler}><HiOutlineMenu /></span>}</div>
            </div>

            <div className={expand ? styles.mobileUrl : styles.url}>
                <div className={styles.links}>
                    <ul>
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/about">ABOUT US</Link></li>
                        <li><Link to="/products">SHOP</Link></li>
                        <li><Link to="/#">CATEGORIES</Link>
                            <ul>
                                {categories && categories.map((item, index) => (
                                    <li key={index}><Link to={`/category/${item.name}/${item._id}`}>{item.name}</Link></li>
                                ))}
                            </ul>
                        </li>
                        <li><Link to="/contact">CONTACT</Link> </li>
                    </ul>
                </div>

                {/* Icons */}
                <div className={`${styles.iCons}`}>
                    <ul>
                        <li> <FiSearch /></li>
                        <li>
                            <Link to="/cart">
                                <FiHeart />

                            </Link>
                        </li>
                        <li><Link to="/cart">
                            <GiShoppingBag /><i>{cartItems.length}</i>
                        </Link></li>


                    </ul>
                    {userInfo ? <div className='btnContainer'>

                        <Link to="/profile" className="lolabtnSm white">Hi {userInfo.name}!</Link>
                        <Link to="/#" className="lolabtnSm black" onClick={logoutHandler}>Logout</Link>
                    </div>
                        :
                        <div className='btnContainer'>
                            <Link to="/login" className="lolabtnSm white">Login</Link>
                            <Link to="/register" className="lolabtnSm black">Sign Up</Link>
                        </div>
                    }
                    {/* <div className={styles.search}>
                            <form onSubmit={submitHandler}>
                                
                                <input type="search" name="search" placeholder="Search for items" onInputCapture={(e) => setKeyword(e.target.value)} />
                            </form>
                        </div> */}
                    {/* <div className={styles.cardUrl}>
                           
                        </div> */}
                </div>
                {/* end of icons */}
            </div>


        </div>
    )
}

export default Navigation
