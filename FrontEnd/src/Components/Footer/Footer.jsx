import React from 'react'
import footerImg from "./logo.png"
import "./Footer.css"
export default function Footer() {
    return (
        <main className="Footer_main">
            <img src={footerImg} alt="" />
            <h3>
                ~ Start connecting with the world now ~
            </h3>
            <small>Designed and developed by <h5>Amanjeet</h5>
{/*                 <a href="http://ankitsinghchauhan.in/">Ankit Singh Chauhan</a> */}
            </small>
        </main>
    )
}
