import React from 'react'
import "./About.css"
import about1 from "./about1.webp"
import about2 from "./about2.webp"
import about3 from "./about3.webp"
export default function About(props) {
    return (
        <main className='About_main' id={props.id} >
            <h2> <b>Unlock</b> the Potential of <br /> Your Online Reach</h2>
            <div className="About_main_primary_div" >
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
                    <h4>Refine</h4>
                    <p>
                        We provide a variety of resources and techniques to help you refine your online presence and make it more effective
                    </p>
                </div>
            </div>
            <br />
            <br />
        </main>
    )
}
