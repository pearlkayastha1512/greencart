// import React from 'react'
// import { assets } from '../assets/assets'
// import { Link } from 'react-router-dom'
// const MainBanner = () => {
//   return (
//     <div className='relative'>
//       <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block' />
//       <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden' />

//       <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
//         <h1 className='text-center text-3xl md:text-4xl font-bold lg:text-5xl md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>Freshness You Can Trust,Savings You will Love!</h1>
      
//       <div className='flex items-center mt-6 font-medium'>
//         <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white cursor-pointer'>
//         Shop now
//         <img className = 'md:hidden transition group-focus:translate-x-1'src={assets.white_arrow_icon} alt="arrow"/>
//         </Link>

//         <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9  py-3 cursor-pointer'>
//         Explore Deals
//         <img className = 'transition group-hover:translate-x-1'src={assets.black_arrow_icon} alt="arrow"/>
//         </Link>
//       </div>
//       </div>
//     </div>
//   )
// }

// export default MainBanner

import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <div className='relative overflow-hidden'>
      {/* Background Images with Fade-in Animation */}
      <div className="relative">
        <img 
          src={assets.main_banner_bg} 
          alt="banner" 
          className={`w-full hidden md:block transition-all duration-1000 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={handleImageLoad}
        />
        <img 
          src={assets.main_banner_bg_sm} 
          alt="banner" 
          className={`w-full md:hidden transition-all duration-1000 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoad={handleImageLoad}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20 md:bg-opacity-10"></div>
      </div>

      {/* Content Overlay with Staggered Animations */}
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>
        
        {/* Animated Heading */}
        <h1 className={`text-center text-3xl md:text-4xl font-bold lg:text-5xl md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15 text-white md:text-gray-800 transition-all duration-1000 transform ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <span className="inline-block animate-fadeInUp">Freshness</span>{' '}
          <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.2s' }}>You</span>{' '}
          <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.4s' }}>Can</span>{' '}
          <span className="inline-block animate-fadeInUp text-orange-600" style={{ animationDelay: '0.6s' }}>Trust,</span>
          <br />
          <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.8s' }}>Savings</span>{' '}
          <span className="inline-block animate-fadeInUp" style={{ animationDelay: '1s' }}>You</span>{' '}
          <span className="inline-block animate-fadeInUp" style={{ animationDelay: '1.2s' }}>Will</span>{' '}
          <span className="inline-block animate-fadeInUp text-orange-600" style={{ animationDelay: '1.4s' }}>Love!</span>
        </h1>

        {/* Animated Buttons Container */}
        <div className={`flex items-center mt-6 font-medium gap-4 transition-all duration-1000 transform ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1.6s' }}>
          
          {/* Primary CTA Button */}
          <Link 
            to={"/products"} 
            className='group relative flex items-center gap-2 px-7 md:px-9 py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-300 rounded-full text-white cursor-pointer transform hover:scale-105 hover:shadow-lg active:scale-95 overflow-hidden'
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <span className="relative z-10">Shop now</span>
            <img 
              className='md:hidden transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2 relative z-10' 
              src={assets.white_arrow_icon} 
              alt="arrow"
            />
          </Link>

          {/* Secondary CTA Button */}
          <Link 
            to={"/products"} 
            className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 backdrop-blur-sm'
          >
            <span className="text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
              Explore Deals
            </span>
            <img 
              className='transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2' 
              src={assets.black_arrow_icon} 
              alt="arrow"
            />
          </Link>
        </div>

        {/* Floating Elements for Visual Enhancement */}
        <div className="absolute top-10 right-10 hidden lg:block">
          <div className="w-4 h-4 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="absolute top-32 right-24 hidden lg:block">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="absolute bottom-32 left-10 hidden lg:block">
          <div className="w-3 h-3 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
          <div className="animate-bounce">
            <div className="w-1 h-8 bg-white bg-opacity-60 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainBanner