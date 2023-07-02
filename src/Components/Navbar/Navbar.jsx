import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import logo from "./logo.png";
import { Link } from 'react-router-dom';

import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app';

import { ToastContainer, toast } from 'react-toastify';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseConfig from '../../firebaseConfig';

export default function Navbar() {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const user = auth.currentUser;
    const [name, setname] = useState("")

    const [userID, setuserID] = useState("");
    const db = getFirestore(app);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setuserID(docSnap.data().userID);
                }
            }
        });
    }, []);

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
                        <li className="login_signup2"> <Link style={{ color: "black", textDecoration: "none" }} to={`/user/auth/edit/${userID}`}>Create List</Link></li>
                        <li className="login_signup2" onClick={handleLogout} >Logout</li>
                    </ul>)
            }
        </nav>
    )
}
