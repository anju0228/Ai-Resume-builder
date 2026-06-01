import React from 'react'
import Banner from '../components/home/home/Banner'
import Hero from '../components/home/home/Hero'
import Features from '../components/home/home/Features'
import Testimonial from '../components/home/home/Testimonial'
import Footer from '../components/home/home/Footer'
import CallToAction from '../components/home/home/CallToAction'

const Home = () => {
  return (
    <div>
        <Banner />
        <Hero />
        <Features />
        <Testimonial />
        <CallToAction />
        <Footer/>
    </div>
  )
}

export default Home