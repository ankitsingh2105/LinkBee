import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import logo from "./logo.png";
import { Link } from 'react-router-dom';

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app';

import { ToastContainer, toast } from 'react-toastify';
import firebaseConfig from '../../firebaseConfig';
export default function Navbar() {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const [name, setname] = useState("")

    let state = localStorage.getItem("localTempState") || false;
    let tempStat;
    if (state === "true") {
        tempStat = true;
    }
    else {
        tempStat = false;
    }

    const handleLogout = async (e) => {
        await signOut(auth);
        console.log("op ankit-> ", localStorage.getItem("localTempState"))
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
            }
            else {
                localStorage.setItem("localTempState", true);
            }
        });
    }, [auth])

    function getFirstWord(str) {
        const firstWord = str.split(' ')[0];
        return firstWord;
    }

    return (
        <nav>
            <ToastContainer />
            <img src={logo} alt="" srcset="" />
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Our Services</li>
            </ul>
            {
                tempStat ?
                    (<ul className="login_signup">
                        <li><Link style={{ textDecoration: "none", color: "black" }} to="login">Login</Link></li>
                        <li><Link style={{ textDecoration: "none", color: "black" }} to="signup">Sign Up</Link></li>
                    </ul>)
                    :
                    (<ul>
                        <li> <b>Welcome ~</b> {getFirstWord(name)}</li>
                        <li className="login_signup2"> <Link style={{color:"black" , textDecoration : "none"}} to="/user/edit">Create List</Link></li>
                        <li className="login_signup2" onClick={handleLogout} >Logout</li>
                    </ul>)
            }
        </nav>
    )
}
