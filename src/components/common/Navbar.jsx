import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import CloudinaryImage from './CloudinaryImage'
import { getOptimizedAssetProps } from '../../utils/cloudinaryHelper'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()

  // Handle scroll effect for navbar background with better performance
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50
      if (scrolled !== shouldBeScrolled) {
        setScrolled(shouldBeScrolled)
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  // Set up intersection observer for Who We Are section
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname.slice(1) || 'home')
      return
    }

    const whoAreWeSection = document.getElementById('who-are-we')
    if (!whoAreWeSection) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // When Who We Are section is in view
          if (entry.isIntersecting) {
            setActiveSection('who-are-we')
          } else {
            // When out of view, set to home if we're on the homepage
            if (location.pathname === '/') {
              setActiveSection('home')
            }
          }
        })
      },
      { threshold: 0.3 } // At least 30% of the section needs to be visible
    )

    observer.observe(whoAreWeSection)
    return () => observer.disconnect()
  }, [location.pathname])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  // Clean up any body styles when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-black/30' : 'bg-transparent'
      } font-['Cairo']`}
    >
      <div className='container mx-auto flex justify-between items-center py-4 px-4 md:px-32'>
        {/* Logo */}
        <div className='flex items-center'>
          <Link to='/' className='flex items-center'>
            <CloudinaryImage
              {...getOptimizedAssetProps('src/assets/images/white_logo.png')}
              alt='Voltant Energy'
              className='h-8 md:h-10'
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className='hidden md:flex items-center space-x-6 lg:space-x-8 text-lg lg:text-xl'>
          <NavLink
            to='/'
            label='Home'
            isActive={location.pathname === '/' && activeSection === 'home'}
          />
          <NavLink
            to='/ev-charging'
            label='EV Charging'
            isActive={location.pathname === '/ev-charging'}
          />
          <NavLink
            to='/waste-to-energy'
            label='Waste To Energy'
            isActive={location.pathname === '/waste-to-energy'}
          />
          <NavLink
            to='/#who-are-we'
            label='Who We Are'
            isActive={
              location.pathname === '/' && activeSection === 'who-are-we'
            }
          />
        </div>

        {/* Call To Action Button (Desktop) */}
        <div className='hidden md:block'>
          <Link to='/contact'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-transparent text-white py-2 px-6 rounded-full font-medium border-2 border-white cursor-pointer transition-colors hover:bg-white/10'
            >
              Get in Touch
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center'>
          <button 
            onClick={toggleMobileMenu} 
            className='text-white p-2'
            aria-label="Toggle mobile menu"
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='12' cy='12' r='10' stroke='white' fill='none' />
              <AnimatePresence>
                {isMobileMenuOpen ? (
                  <motion.path
                    key='close'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    d='M7 7 L17 17 M17 7 L7 17'
                  />
                ) : (
                  <motion.g
                    key='open'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <path d='M7 10 H17' />
                    <path d='M7 14 H17' />
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='md:hidden fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-50'
          >
            <div className='absolute top-4 left-4 p-4'>
              <Link to='/' className='flex items-center'>
                <CloudinaryImage
                  {...getOptimizedAssetProps('src/assets/images/white_logo.png')}
                  alt='Voltant Energy'
                  className='h-8'
                />
              </Link>
            </div>
            <div className='absolute top-4 right-4'>
              <button
                onClick={toggleMobileMenu}
                className='w-10 h-10 mt-4 flex items-center justify-center'
                aria-label="Close mobile menu"
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='12' cy='12' r='10' />
                  <path d='M8 8 L16 16' />
                  <path d='M16 8 L8 16' />
                </svg>
              </button>
            </div>
            <div className='flex flex-col items-center space-y-6 text-white text-lg'>
              <Link to='/' onClick={toggleMobileMenu}>
                <span
                  className={
                    location.pathname === '/' && activeSection === 'home'
                      ? 'text-green-400'
                      : ''
                  }
                >
                  Home
                </span>
              </Link>
              <Link to='/ev-charging' onClick={toggleMobileMenu}>
                <span
                  className={
                    location.pathname === '/ev-charging' ? 'text-green-400' : ''
                  }
                >
                  EV Charging
                </span>
              </Link>
              <Link to='/waste-to-energy' onClick={toggleMobileMenu}>
                <span
                  className={
                    location.pathname === '/waste-to-energy'
                      ? 'text-green-400'
                      : ''
                  }
                >
                  Waste To Energy
                </span>
              </Link>
              <Link to='/#who-are-we' onClick={toggleMobileMenu}>
                <span
                  className={
                    location.pathname === '/' && activeSection === 'who-are-we'
                      ? 'text-green-400'
                      : ''
                  }
                >
                  Who We Are
                </span>
              </Link>
              <Link to='/contact' onClick={toggleMobileMenu}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='bg-transparent text-white py-2 px-6 rounded-full font-medium border-2 border-white cursor-pointer mt-4'
                >
                  Get In Touch
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Navigation Link component for desktop
const NavLink = ({ to, label, isActive }) => (
  <Link
    to={to}
    className={`${
      isActive ? 'text-green-400' : 'text-white'
    } hover:text-blue-100 font-medium relative group transition-colors`}
  >
    {label}
    <span
      className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
        isActive ? 'w-full bg-green-400' : 'w-0 bg-white group-hover:w-full'
      }`}
    ></span>
  </Link>
)

export default Navbar
