import React from 'react'
import "./Home.css"
import HomeImg from "./Linkbee_Home_Image.webp"
export default function Home(props) {
    return (
        <main className="main_home" id={props.id} >
            <div>
                <h1>
                    Your links
                </h1>
                <h1>
                    Your story.
                </h1>
                <p>
                    Welcome to our platform designed to empower you in the digital realm. Curate and showcase your online presence with ease, allowing others to explore the depths of your creativity. <b>Share you portfolio, social media accounts and more only with one ~ Link Bee ~ link.</b>
                </p>
            </div>
            <div>
                <img src={HomeImg} alt="" />
            </div>
        </main>
    )
}
