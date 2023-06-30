import React from 'react'
import "./Home.css"
import HomeImg from "./Linkbee_Home_Image.png"
export default function Home() {
    return (
        <main className="main_home">
            <div>
                <h1>
                    Your links
                </h1>
                <h1>
                    Your story.
                </h1>
                <p>
                    Welcome to our platform designed to empower you in the digital realm. Curate and showcase your online presence with ease, allowing others to explore the depths of your creativity.
                </p>
            </div>
            <div>
                <img src={HomeImg} alt="" />
            </div>
        </main>
    )
}
