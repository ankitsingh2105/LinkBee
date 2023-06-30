
import React from 'react'
import "./Signup.css";
import elem1 from "./elem1.png"
import elem2 from "./elem2.png"
export default function Signup() {
    return (
        <main className="Signup_main">
            <div className="fixed-images">
                <img id='elem4' src={elem2} alt="" />
                <img id="elem5" src={elem1} alt="" />
                <img id="elem6" src={elem1} alt="" />
            </div>
            <h1>
                Thank you for choosing Us
            </h1>
            <h2>~ Sign Up for free ~</h2>
            <form action="">
                <input type="text" placeholder='Name' name="" id="" />
                <input type="text" placeholder='User Name' name="" id="" />
                <input placeholder='Password' type="password" name="" id="" />
                <button>Sign Up</button>
                <br />
            </form>
            <h3>OR</h3>
            <button> <i class="fa-brands fa-google"></i> &nbsp; &nbsp; Sign Up with Google</button>
            <br />
        </main>
    )
}
