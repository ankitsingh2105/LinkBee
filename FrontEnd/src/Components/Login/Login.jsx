import React, { useState, useEffect } from 'react'
import "./Login.css"
import elem1 from "./elem1.webp"
import elem2 from "./elem2.webp"
import axios from "axios";
axios.defaults.withCredentials = true;
import backendLink from "../backendLink";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


import { Helmet } from 'react-helmet';

export default function Login() {

  const handleLogin = async (e) => {
    e.preventDefault();
    toast("Checking Credentials", { autoClose: 5000 });
    const userID = e.target.userID.value;
    const password = e.target.password.value;
    try {
      e.target.userID.value = "";
      e.target.password.value = "";
      let response = await axios.post(`${backendLink}/login`, {
        userID, password
      }, {
        withCredentials: true,
      });
      console.log("response :: ", response);
      toast.success("Logging in", { autoClose: 1500 });
      window.location.href = `user/${userID}`;
    }
    catch (error) {
      console.log("the error :: ", error);
      toast.error("Invalid Credentials", { autoClose: 1500 });
    }
  }

  const loginMessage = () => {
  }

  return (
    <main className="Login_main">

      <ToastContainer />
      <Helmet>
        <title>Link Bee ~ Log In</title>
      </Helmet>

      <div className="fixed-images">
        <img id='elem4' src={elem2} alt="" />
        <img id="elem5" src={elem1} alt="" />
      </div>
      <h1>
        Welcome back to Link Bee
      </h1>
      <h2>~ Login to you Link Bee account ~</h2>
      <form onSubmit={handleLogin} action="">
        <input required type="userID" placeholder='userID' name="userID" />
        <input required placeholder='Password' type="password" name="password" />
        <button onClick={loginMessage}>Login</button>
      </form>
      <h2>Don't have an account? Sign Up here</h2>
      <button onClick={() => { window.location.href = "/signup" }} >Sign Up</button>
      <br />
      <br />
    </main>
  )
}