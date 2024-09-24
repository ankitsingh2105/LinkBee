import React from 'react'
import "./Services.css"
import meeting from "./meeting.webp"
import elem1 from "./elem1.webp"
import elem2 from "./elem2.webp"
import elem3 from "./elem3.webp"
export default function Services(props) {
  return (
    <main id={props.id} className="Services_main">
      <div className="fixed-images">
        <img id='elem1' src={elem1} alt="" />
        <img id="elem2" src={elem2} alt="" />
        <img id="elem3" src={elem3} alt="" />
      </div>

      <h1>Services</h1>
      <img src={meeting} alt="image by freepik" />
      <br />
      <p>
        Our platform offers seamless integration of various links into your centralized profile page. Whether you want to share your portfolio, blog, social media profiles, or any other online content, our link integration service allows you to consolidate and present them in one convenient location. By adding your desired links, you can provide visitors with easy access to your diverse online presence and enable them to explore your work, connect with you on different platforms, and discover more about your digital footprint. Simplify the process of sharing and navigating your online content with our link integration service, making it effortless for others to engage with your diverse online identity
      </p>
    </main>
  )
}
