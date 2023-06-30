import React from 'react'
import "./Navbar.css"
import logo from "./logo.png";
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
                <li>Login</li>
                <li>Sign Up</li>
            </ul>
        </nav>
    )
}
