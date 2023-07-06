import React, { useState, useEffect } from 'react'
import "./Login.css"
import elem1 from "./elem1.webp"
import elem2 from "./elem2.webp"
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../firebaseConfig'
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { Helmet } from 'react-helmet';

export default function Login() {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      e.target.email.value = "";
      e.target.password.value = "";
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logging in", { autoClose: 1500 });
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      window.location.href = `user/${docSnap.data().userID}`;
    } catch (error) {
      toast.error("Invalid Credentials", { autoClose: 1500 });
    }
  }

  const loginMessage = () => {
    toast("Checking Credentials", { autoClose: 1500 });
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
        <input type="email" placeholder='Email' name="email" />
        <input placeholder='Password' type="password" name="password" />
        <button onClick={loginMessage}>Login</button>
        <br />
      </form>
      <h2>Don't have an account? Sign Up here</h2>
            <button onClick={() => { window.location.href = "/signup" }} >Sign Up</button>
            <br />
      <br />
    </main>
  )
}