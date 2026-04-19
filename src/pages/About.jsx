import React from 'react'
import "./about.css"
import sponsorImg from '../assets/images/sponsor.png'
import submitImg from '../assets/images/SVG.png'
import moviesPoster from '../assets/images/Vector 14.png'
export default function About() {
  return (
    <div className='containerOfAbout'>
      <div className="contextOfAbout">
        <h3 className='aboutHeader'>About Us</h3>
        <div className='textOfAbout'>
          <span >
          At DailyHub, we curate a diverse collection of uplifting content to fuel your 
          creativity and spark new ideas every day. Whether you're a seasoned designer, a 
          budding artist, or someone seeking daily motivation, we've got you covered.
          </span>
          <span >
          Explore our curated selection of inspiring stories, design trends, and thought-
          provoking content that aims to elevate your daily experiences. Join our 
          community of creative minds and embark on a journey of continuous inspiration.
          </span >
          <span >
          DailyHub is more than just a website, it's a hub for those who seek to infuse their 
          daily lives with creativity, innovation, and positive vibes. Let's inspire and be 
          inspired together!
          </span >
        </div>
        <h3 className='sponsorHeader'>A Sponsor</h3>
        <div className='textOfSponsor'>
          <span>Open for New Sponsorships!</span>
          <button className="sponsorBtn">
            <img className='sponsorImg' src={sponsorImg} alt="sponsorImg" />
            <span className='sponsorContext'>A Sponsor</span>
          </button>  
        </div>
        
        <h3 className='submitHeader'>Submit</h3>
        <div className='textOfSubmit'>
          <span>
            Seeking top-notch tools for designers! Submit your recommendations via our 
            form, each is manually approved for the highest standards. Join us in shaping 
            design excellence!
          </span>
          <button className="submitBtn">
            <span className='sponsorContext'>Submit</span>
            <img className='submitImg' src={submitImg} alt="submitImg" />
          </button>  
        </div>

      </div>
      <img className='moviesPoster' src={moviesPoster} alt='moviesPoster'/>
    </div>
  )
}
