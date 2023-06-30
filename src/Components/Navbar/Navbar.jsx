import React from 'react'
import "./Navbar.css"
import logo from "./logo.png";
import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <nav>
            <img src={logo} alt="" srcset="" />
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Our Services</li>
            </ul>
            <ul className="login_signup">
                <li><Link style={{textDecoration : "none" , color:"black"}} to ="login">Login</Link></li>
                <li><Link style={{textDecoration : "none" , color:"black"}} to ="signup">Sign Up</Link></li>
            </ul>
        </nav>
    )
}
