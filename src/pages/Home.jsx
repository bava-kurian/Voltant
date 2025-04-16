import React from 'react'
import HeroSection from '../components/HeroSection'
import ImpactMetrics from '../components/ImpactMetrics'
import Navbar from '../components/common/Navbar'
import WhoAreWe from '../components/WhoAreWe'
import Footer from '../components/common/Footer'
import ClientsSection from '../components/ClientsSection'

const Home = () => {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col items-center relative">
      {/* Navbar */}
      <div className="w-full absolute top-0 left-0 z-50">
        <Navbar />
      </div>
      
      {/* Hero section */}
      <div 
        className="relative bg-black w-full h-screen"
        style={{ 
          overflow: 'hidden',
        }}
      >
        <HeroSection />
      </motion.div>

      {/* Content sections */}
      <div className="w-full">
        {/* ImpactMetrics section */}
        <div className="w-full">
          <ImpactMetrics />
        </div>

        {/* WhoAreWe section */}
        <div className="w-full">
          <WhoAreWe />
        </div>
        
        {/* Footer */}
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Home
