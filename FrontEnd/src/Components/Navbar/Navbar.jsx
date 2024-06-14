import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from './link bee.png';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from "axios";

export default function Navbar(props) {

    const { id } = props;
    const scroll = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: "smooth" });
    }

    const [name, setname] = useState("")
    const [loading, setloading] = useState(true);
    const [isUser, setTempStat] = useState(false);

    const [userID, setuserID] = useState("");


    const handleLogout = async (e) => {
        toast.success("Logging Out", { autoClose: 1500 });
        setTimeout(() => {
            window.location.href = "/";
        }, 1500);
    }

    function getFirstWord(str) {
        if(!str) return;
        console.log(" :: " , str);
        // const firstWord = str.split(' ')[0];
        return "firstWord";
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const movetoauth = () => {
        window.location.href = `/user/auth/edit/${userID}`
    }

    useEffect(() => {
        async function fetchData() {
            console.log(window.location.href);
            let fullUrl = window.location.href;
            let lastOne = fullUrl.split("/");
            console.log(lastOne);
            const userID = lastOne[lastOne.length - 1];
            if (userID) { // Ensure userID is defined
                console.log("userID :: ", userID);
                try {
                    const response = await axios.post(`http://localhost:3000/user/${userID}`, {});
                    setname(response.data);
                    setloading(false);
                    console.log( "some Data :: " , response.data);
                    setTempStat(true);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }
        fetchData();
    }, []); 

    return (
        <nav id={id}>
            <ToastContainer />
            <img src={logo} alt="" srcSet="" />
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li onClick={() => { scroll("home") }}>Home</li>
                <li onClick={() => { scroll("about") }}>About</li>
                <li onClick={() => { scroll("services") }}>Services</li>
            </ul>
            <ul>
                {
                    !isUser ? (
                        <>
                            <li className="login_signup">
                                <Link className='login_signup2' style={{ textDecoration: "none", color: "black" }} to="login">Login</Link>
                            </li>
                            <li><Link className='login_signup2' style={{ textDecoration: "none", color: "black" }} to="signup">Sign Up</Link></li>
                        </>

                    ) : (
                        <>
                            <li>
                                {
                                    loading ? (
                                        <>
                                            <b>Welcome</b>
                                            <div className="loadingWheel2"></div>
                                        </>
                                    ) : (
                                        <>
                                            <b>Welcome </b> <div>
                                                {getFirstWord(name)}
                                            </div>
                                        </>
                                    )
                                }
                            </li>
                            <li className="login_signup2" onClick={movetoauth} style={{ color: "black", textDecoration: "none" }}>
                                Create
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
