import React from 'react'
import "./Login.css"
import elem1 from "./elem1.png"
import elem2 from "./elem2.png"
export default function Login() {
  return (
    <main className="Login_main">
      <div className="fixed-images">
                <img id='elem4' src={elem2} alt="" />
                <img id="elem5" src={elem1} alt="" />
            </div>
      <h1>
        Welcome back to Link Bee
      </h1>
      <h2>~ Login to you Link Bee account ~</h2>
      <form action="">
        <input type="text" placeholder='User Name' name="" id="" />
        <input placeholder='Password' type="password" name="" id="" />
        <button>Login</button>
        <br />
      </form>
      <h3>OR</h3>
      <button> <i class="fa-brands fa-google"></i> &nbsp; &nbsp; Login Using Google</button>
      <br />
    </main>
  )
}
