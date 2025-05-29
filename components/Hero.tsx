"use client"

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const { scrollY } = useScroll()
  
  const titleY = useTransform(scrollY, [0, 300], [0, 150])
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.1])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <section className="w-full min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        style={{ scale: imageScale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[url('/images/characters/consciousness-icon.webp')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-detroit-black/80 via-detroit-black/40 to-detroit-black"></div>
      </motion.div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 z-10">
        <div className="h-full w-full grid-bg-overlay opacity-20"></div>
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: titleY, opacity }}
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <motion.h1 
              className="font-rajdhani text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-2 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="text-detroit-blue detroit-glow">DETROIT</span>
              <span className="text-detroit-white">: </span>
              <span className="text-detroit-white detroit-glow">BECOME HUMAN</span>
            </motion.h1>
            <div className="absolute -inset-4 bg-detroit-blue/5 blur-xl z-0"></div>
          </div>
          
          <motion.p 
            className="text-detroit-white/80 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            An interactive exploration of identity, consciousness, and what it means to be alive.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative max-w-4xl w-full"
        >
          <div className="bg-detroit-black/40 backdrop-blur-sm border border-detroit-blue/20 rounded-lg p-6 interface-border">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="font-rajdhani text-2xl text-detroit-blue mb-4">MAKE YOUR CHOICES</h2>
                <p className="android-terminal text-detroit-white/90 leading-relaxed">
                  Every decision shapes the story. The fate of Detroit lies in your hands. Navigate through moral dilemmas, forge relationships, and determine the future of androids and humanity alike.
                </p>
              </div>
              <div className="w-24 h-24 relative">
                <div className="absolute inset-0 border-2 border-detroit-blue/50 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-2 border-2 border-detroit-blue/30 rounded-full animate-spin-reverse"></div>
                <div className="absolute inset-4 border-2 border-detroit-blue/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-detroit-blue/50 rounded-full p-2">
            <div className="w-2 h-2 bg-detroit-blue rounded-full animate-bounce"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interface Lines */}
      <div className="absolute inset-x-0 bottom-0 h-32 z-30 bg-gradient-to-t from-detroit-black to-transparent"></div>
    </section>
  )
}

// Add these styles to your globals.css
/*
.grid-bg-overlay {
  background-image: linear-gradient(to right, rgba(30, 136, 229, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(30, 136, 229, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

.animate-spin-reverse {
  animation: spin 6s linear infinite reverse;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
*/
