import React from 'react'
import globe from "./globe.webp"
import elem4 from "./elem4.webp"
import elem5 from "./elem5.webp"
import "./Delivered.css"
export default function Delivered() {
    return (
        <main className="Delivered_main">
            <div className="fixed-images">
                <img id='elem4' src={elem5} alt="" />
                <img id="elem5" src={elem4} alt="" />
            </div>
            <h1>
                Reach out to everyone with one link
            </h1>
            <p>
                With a single link, you can showcase your portfolio, share your social media accounts, promote your blog, and more.
            </p>
            <img src={globe} alt="" />
            <br /> <br />
        </main>
    )
}
