import React from 'react'
import Navbar from './Components/Navbar/Navbar';
import Home from "./Components/Home/Home"
import About from "./Components/About/About"
import Servics from "./Components/Services/Services"
import Delivered from "./Components/Delivered/Delivered"
export default function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About/>
      <Servics/>
      <Delivered/>
    </>
  )
}
