import React from 'react'
import globe from "./globe.png"
import "./Delivered.css"
export default function Delivered() {
    return (
        <main className="Delivered_main">
            <h1>
                Reach out to everyone with one link
            </h1>
            <p>
                With a single link, you can showcase your portfolio, share your social media accounts, promote your blog, and more.
            </p>
            <img src={globe} alt="" />
            <h1>
            Start connecting with the world now!
            </h1>
            <br /> <br />
        </main>
    )
}
