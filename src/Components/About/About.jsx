import React from 'react'
import "./About.css"
import about1 from "./about1.png"
import about2 from "./about2.png"
import about3 from "./about3.png"
export default function About() {
    return (
        <main className='About_main' >
            <h2> <b>Unlock</b> the Potential of <br /> Your Online Reach</h2>
            <div>
                <div className='About_main_secondary_div'>
                    <img src={about1} alt="" />
                    <br />
                    <h4>Showcase</h4>
                    <p>
                        We believe in the power of showcasing your unique talents, passions, and achievements to the world.
                    </p>
                </div>
                <div className='About_main_secondary_div'>
                    <img src={about2} alt="" />
                    <br />
                    <h4>Engage</h4>
                    <p>
                        We understand the importance of actively engaging with your audience and building meaningful connections.
                    </p>
                </div>
                <div className='About_main_secondary_div'>
                    <img src={about3} alt="" />
                    <br />
                    <h4>Optimize</h4>
                    <p>We offer a range of analytics and optimization tools to help you fine-tune your online presence.
                    </p>
                </div>
            </div>
            <br />
            <br />
        </main>
    )
}
