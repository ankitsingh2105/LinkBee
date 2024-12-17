import React, { useEffect } from 'react';
import "./Signup.css";
import elem1 from "./elem1.webp";
import elem2 from "./elem2.webp";
import axios from "axios";
axios.defaults.withCredentials = true;

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import backendLink from '../backendLink';

import { Helmet } from 'react-helmet';

export default function Signup() {
    const userIDRegex = /^[a-zA-Z0-9_-]{4,20}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const userID = e.target.userID.value;
        const password = e.target.password.value;

        if (!userIDRegex.test(userID)) {
            toast.error(
                "Invalid userID. It should be 4-20 characters long and can contain only alphanumeric characters, underscore, and hyphen.",
                { autoClose: 1500 }
            );
            return;
        }

        try {
            toast.success("Please wait ... ", { autoClose: 4000 });
            let response = await axios.post(`${backendLink}/signup`, {
                name, email, userID, password
            });
            toast.success("Sign Up successfull, please login", { autoClose: 1500 });
            window.location.href = `login`;
        } 
        catch (e) {
            console.log("error" , e);
            toast.error("Password should be at least 6 characters / Email already exists", { autoClose: 1700 });
        }
    };


    return (
        <main className="Signup_main">

            <ToastContainer />
            <Helmet>
                <title>Link Bee ~ Sign Up</title>
            </Helmet>

            <div className="fixed-images">
                <img id='elem4' src={elem2} alt="" />
                <img id="elem5" src={elem1} alt="" />
                <img id="elem6" src={elem1} alt="" />
            </div>

            <h1>
                Thank you for choosing Us
            </h1>

            <h2>~ Sign Up for free ~</h2>

            <form action="" onSubmit={handleSubmit} >
                <input type="text" placeholder='Name' name="name" required />
                <input type="email" placeholder='Email' name="email" required />
                <input type="text" placeholder='User ID (cannot be changed)' name="userID" required />
                <input placeholder='Password' type="password" name="password" required />
                <button>Sign Up</button>
            </form>

            <h2>Already have an account? Login here</h2>
            <button onClick={() => { window.location.href = "/login" }} >Log In</button>
            <br /><br />
        </main>
    )
}
