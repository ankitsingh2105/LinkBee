import React, { lazy } from 'react'
import Navbar from './Components/Navbar/Navbar';
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Services from "./Components/Services/Services"
import Delivered from "./Components/Delivered/Delivered";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const User = lazy(() => import('./Components/User/User'));
const FinalDisplay = lazy(() => import('./Components/FinalDisplay/FinalDisplay'));
const Message = lazy(() => import('./Components/Message/Message'));
const Error = lazy(() => import('./Components/Error/Error'));
const Charts = lazy(() => import('./Components/Charts/Charts'));
export default function App() {

  const currentUrl = window.location.pathname;
  const parts = currentUrl.split('/');
  const userID = parts[parts.length - 1];
  const userIDAnalyse = parts[parts.length - 2];
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
                <Services id="services" />
                <Delivered />
                <Message />
              </>
            }>
          </Route>
          <Route element={<Login />} path='login' />
          <Route element={<Signup />} path='signup' />
          <Route element={<User />} path={`user/auth/edit/${userID}`} />
          <Route element={<User />} path={`/user`} />

          <Route element={<>
            <Navbar />
            <Charts />
          </>
          } path={`user/${userIDAnalyse}/analytics`} />

          <Route path={`user/${userID}`} element={
            <>
              <Navbar />
              <Home id="home" />
              <About id="about" />
              <Services id="services" />
              <Delivered />
              <Message />
            </>
          }
          />

          <Route element={<FinalDisplay />} path={`${userID}`} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter >
    </>
  )
}