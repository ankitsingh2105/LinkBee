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
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element=
            {
              <>
                <Navbar />
                <Home />
                <About />
                <Servics />
                <Delivered />
              </>
            }>
          </Route>
          < Route element={<Login />} path='login' />
          < Route element={<Signup />} path='signup' />
          < Route element={<User />} path='user/edit' />
        </Routes>
        <Footer />
      </BrowserRouter >
    </>
  )
}
