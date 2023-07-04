import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import Home from "./Components/Home/Home"
import About from "./Components/About/About"
import Servics from "./Components/Services/Services"
import Delivered from "./Components/Delivered/Delivered"
import Footer from "./Components/Footer/Footer"
import Login from './Components/Login/Login';
import Signup from "./Components/Signup/Signup"
import User from './Components/User/User';
import FinalDisplay from './Components/FinalDisplay/FinalDisplay';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseConfig from './firebaseConfig';

export default function App() {

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [userID, setuserID] = useState("");
  const db = getFirestore(app);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setuserID(docSnap.data().userID);
        }
      }
    });
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element=
            {
              <>
                <Navbar />
                <Home id="home" />
                <About id="about" />
                <Servics id="services" />
                <Delivered />
              </>
            }>
          </Route>
          <Route element={<Login />} path='login' />
          <Route element={<Signup />} path='signup' />
          <Route element={<User />} path={`user/auth/edit/${userID}`} />
          <Route element={<FinalDisplay />} path={`${userID}`} />
        </Routes>
        <Footer />
      </BrowserRouter >
    </>
  )
}