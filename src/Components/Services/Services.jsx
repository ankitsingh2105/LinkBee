import React from 'react'
import "./Services.css"
import meeting from "./meeting.png"
export default function Services() {
  return (
    <main className="Services_main">
        <h1>Services</h1>
        <img src={meeting} alt="image by freepik" />
        <br />
        <p>
        Our platform offers seamless integration of various links into your centralized profile page. Whether you want to share your portfolio, blog, social media profiles, or any other online content, our link integration service allows you to consolidate and present them in one convenient location. By adding your desired links, you can provide visitors with easy access to your diverse online presence and enable them to explore your work, connect with you on different platforms, and discover more about your digital footprint. Simplify the process of sharing and navigating your online content with our link integration service, making it effortless for others to engage with your diverse online identity
        </p>
    </main>
  )
}
