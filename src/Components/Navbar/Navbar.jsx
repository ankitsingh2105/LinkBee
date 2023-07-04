import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from './link bee.png';
import { Link } from 'react-router-dom';

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import { ToastContainer, toast } from 'react-toastify';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseConfig from '../../firebaseConfig';

export default function Navbar(props) {

    const { id } = props;
    const scroll = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: "smooth" });
    }

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [name, setname] = useState("")

    const [userID, setuserID] = useState("");
    const db = getFirestore(app);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setuserID(docSnap.data().userID);
                }
            }
        });
    }, []);

    let state = localStorage.getItem("localTempState") || false;
    let tempStat;
    if (state === "true") {
        tempStat = true;
    } else {
        tempStat = false;
    }

    const handleLogout = async (e) => {
        await signOut(auth);
        toast.success("Logging Out", { autoClose: 1500 });
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem("localTempState", false);
                setname(user.displayName)
            } else {
                localStorage.setItem("localTempState", true);
            }
        });
    }, [auth])

    function getFirstWord(str) {
        const firstWord = str.split(' ')[0];
        return firstWord;
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav id = {id}>
            <ToastContainer />
            <img src={logo} alt="" srcSet="" />
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li onClick={() => { scroll("home") }}>Home</li>
                <li onClick={() => { scroll("about") }}>About</li>
                <li onClick={() => { scroll("services") }}>Services</li>
            </ul>
            <ul>
                {
                    tempStat ? (
                        <>
                            <li className="login_signup">
                                <Link className='login_signup2' style={{ textDecoration: "none", color: "black" }} to="login">Login</Link>
                            </li>
                            <li><Link className='login_signup2' style={{ textDecoration: "none", color: "black" }} to="signup">Sign Up</Link></li>
                        </>

                    ) : (
                        <>
                            <li>
                                <b>Welcome </b> {getFirstWord(name)}
                            </li>
                            <li className="login_signup2">
                                <Link style={{ color: "black", textDecoration: "none" }} to={`/user/auth/edit/${userID}`}>
                                    Create
                                </Link>
                            </li>
                            <li className="login_signup2" onClick={handleLogout}>Logout</li>
                        </>
                    )
                }
            </ul>
            <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="menu-line"></div>
                <div className="menu-line"></div>
                <div className="menu-line"></div>
            </div>
        </nav>
    )
}
