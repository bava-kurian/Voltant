import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ChatButton from '../components/common/ChatButton';

// Import common section components
import HeroSection from '../components/common/SectionComponents/HeroSection';
import SeamlessChargingSection from '../components/common/SectionComponents/SeamlessChargingSection';
import MidSection from '../components/common/SectionComponents/MidSection';
import ProfilesSection from '../components/common/SectionComponents/ProfilesSection';

// Import data
import { cpoData } from '../utils/sectionData';

const Cpo = () => {
  return (
    <>
      <Navbar />
      {/* Use the ChatButton component */}
      <ChatButton phoneNumber="971555555555" />
      
      <div className='flex flex-col min-h-screen bg-white px-0 overflow-hidden'>
        <HeroSection 
          title={cpoData.hero.title}
          breadcrumbs={cpoData.hero.breadcrumbs}
          heroImage={cpoData.hero.heroImage}
        />
        
        <div className='w-full flex flex-col items-center justify-center px-0 md:px-20'>
          <SeamlessChargingSection 
            title={cpoData.seamlessCharging.title}
            paragraphs={cpoData.seamlessCharging.paragraphs}
          />
        </div>
        
        <motion.section 
          className='w-full py-16'
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.1 }}
          variants={{ 
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } }
          }}
        >
          <MidSection 
            backgroundImage={cpoData.midSection.backgroundImage}
            sectionTitle={cpoData.midSection.sectionTitle}
            features={cpoData.midSection.features}
          />
        </motion.section>
        
        <ProfilesSection 
          sectionTitle={cpoData.profiles.sectionTitle}
          leftProfiles={cpoData.profiles.leftProfiles}
          rightProfiles={cpoData.profiles.rightProfiles}
          buttonText={cpoData.profiles.buttonText}
          showButton={cpoData.profiles.showButton}
        />
      </div>
      
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <Footer />
      </motion.footer>
    </>
  );
};

export default Cpo;
