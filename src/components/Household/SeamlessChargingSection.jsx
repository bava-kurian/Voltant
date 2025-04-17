import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

const sectionFadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      staggerChildren: 0.25
    }
  }
};

const SeamlessChargingSection = () => {
  return (
    <motion.section 
      className='w-full py-20 md:py-28 px-6'
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      variants={sectionFadeIn}
    >
      <div className='max-w-4xl mx-auto'>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={fadeIn}
          className='text-4xl text-gray-500 font-black text-center mb-24'
        >
          Household Biogas Solutions<br />
          Clean Energy, Right at Home.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          variants={fadeInRight}
          className='text-gray-700 mb-6 text-center text-xl font-normal'
        >
          Our Household Biogas Plants provide an eco-friendly and cost-effective way to convert daily organic waste into renewable energy. Designed for homes, farms, and small communities, these compact systems generate biogas for cooking, heating, and other domestic uses while reducing waste disposal issues. Easy to install and maintain, they offer a sustainable alternative to conventional energy sources..
        </motion.p>

      </div>
    </motion.section>
  );
};

export default SeamlessChargingSection;
