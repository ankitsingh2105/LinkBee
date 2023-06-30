import React from 'react'
import footerImg from "./logo.png"
import "./Footer.css"
export default function Footer() {
    return (
        <main className="Footer_main">
            <img src={footerImg} alt="" />
            <h2>
                ~ Start connecting with the world now ~
            </h2>
        </main>
    )
}
