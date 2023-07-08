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
import Message from './Components/Message/Message';
import Error from './Components/Error/Error';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {

  const currentUrl = window.location.pathname;
  const parts = currentUrl.split('/');
  const userID = parts[parts.length - 1];
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
                <Message />
              </>
            }>
          </Route>
          <Route element={<Login />} path='login' />
          <Route element={<Signup />} path='signup' />
          <Route element={<User />} path={`user/auth/edit/${userID}`} />
          <Route element={<User />} path={`/unauth/tempUser`} />

          <Route path={`user/${userID}`} element={
            <>
              <Navbar />
              <Home id="home" />
              <About id="about" />
              <Servics id="services" />
              <Delivered />
              <Message />
            </>
          }
          />

          <Route element={<FinalDisplay />} path={`${userID}`} />
          <Route path="*" element={<Error/>}/>
        </Routes>
        <Footer />
      </BrowserRouter >
    </>
  )
}