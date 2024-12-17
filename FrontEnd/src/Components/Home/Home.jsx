import React, { useEffect } from 'react'
import "./Home.css"
import HomeImg from "./Linkbee_Home_Image.webp"
import bee from "./elem2.webp";
import axios from "axios";

export default function Home(props) {
    const handleNavigation = () => {
        window.location.href = "/user";
    }

    return (
        <main className="main_home" id={props.id}>
            <img style={{ width: "100px", height: "100px" }} className="floating_bee" src={bee} alt="" />
            <div>
                <h1>
                    Your links
                </h1>
                <h1>
                    Your story.
                </h1>
                <div className="align">
                    <p>
                        Welcome to our platform designed to empower you in the digital realm. Curate and showcase your online presence with ease, allowing others to explore the depths of your creativity. <b>Share you portfolio, social media accounts and more only with one ~ Link Bee ~ link.</b>
                    </p>
                    <div className="align2">
                        <button onClick={handleNavigation} >Demo Page</button>
                        <button onClick={() => { window.location.href = "/login" }} >Get Started</button>
                    </div>
                </div>
            </div>
            <img onClick={() => { window.location.href = "https://linkbeemern.vercel.app/ankit" }} src={HomeImg} alt="" />
        </main>
    )
}
