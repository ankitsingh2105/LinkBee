import React , {useState , useEffect} from 'react'
import "./Login.css"
import elem1 from "./elem1.webp"
import elem2 from "./elem2.webp"
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../firebaseConfig'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { onAuthStateChanged, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";

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
      await signInWithEmailAndPassword(auth, email, password);
      e.target.email.value = "";
      e.target.password.value = "";
      e.target.userID.value = "";
      toast.success("Logging in", { autoClose: 1500 });
      onAuthStateChanged(auth, async (user) => {
        if(user){
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
              window.location.href = `user/${docSnap.exists().userID}`;
          }
      }});
    } catch (error) {
      toast.error("Invalid Credentials", { autoClose: 1500 });
    }
  }

  const loginMessage =()=>{
    toast("Checking Credentials" , {autoClose:1500});
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
      <br />
    </main>
  )
}