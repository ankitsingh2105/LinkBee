import React ,{lazy} from 'react'
import Navbar from './Components/Navbar/Navbar';
const Home = lazy (()=> import("./Components/Home/Home"))
const About = lazy (()=> import("./Components/About/About"))
const Servics = lazy (()=> import("./Components/Services/Services"))
const Delivered = lazy (()=> import("./Components/Delivered/Delivered"))
const Footer = lazy (()=> import("./Components/Footer/Footer"))
const Login = lazy (()=> import('./Components/Login/Login'));
const Signup = lazy (()=> import("./Components/Signup/Signup"))
const User = lazy (()=> import('./Components/User/User'));
const FinalDisplay = lazy (()=> import('./Components/FinalDisplay/FinalDisplay'));
const Message = lazy (()=> import('./Components/Message/Message'));
const Error = lazy (()=> import('./Components/Error/Error'));

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