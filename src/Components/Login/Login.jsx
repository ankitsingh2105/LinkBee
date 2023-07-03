import React from 'react'
import "./Login.css"
import elem1 from "./elem1.png"
import elem2 from "./elem2.png"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../firebaseConfig'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Helmet } from 'react-helmet';


export default function Login() {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      e.target.email.value = "";
      e.target.password.value = "";
      toast.success("Logging in", { autoClose: 1500 });
      setInterval(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.log(email, password);
      console.log(auth.currentUser)
      toast.error("Invalid Credentials", { autoClose: 1500 });
    }
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
        <button>Login</button>
        <br />
      </form>
      <br />
    </main>
  )
}
