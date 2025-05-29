"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Users, BookOpen, Zap, Database, Info, Github, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from "sonner"
import SampleVideoPreloader from './SampleVideoPreloader'
import { usePresentation } from '../contexts/PresentationContext'

const navItems = [
  { name: 'Home', icon: <Home size={18} />, href: '#', description: 'Return to the top of the page' },
  { name: 'Characters', icon: <Users size={18} />, href: '#characters', description: 'Explore the main characters of Detroit: Become Human' },
  { name: 'Gameplay', icon: <Zap size={18} />, href: '#gameplay', description: 'Experience interactive gameplay elements' },
  { name: 'Themes', icon: <Database size={18} />, href: '#world', description: 'Discover the philosophical themes of the game' },
  { name: 'About', icon: <Info size={18} />, href: '#about', description: 'Learn more about this presentation' },
]

export default function NavSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isSampleOpen, setIsSampleOpen] = useState(false)
  const { currentSlide, totalSlides, goToNextSlide, goToPrevSlide } = usePresentation()
  
  // Track scroll position to highlight the current section in navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      
      // Check each section's position
      const sections = [
        { id: 'characters', el: document.getElementById('characters') },
        { id: 'gameplay', el: document.getElementById('gameplay') },
        { id: 'world', el: document.getElementById('world') },
      ]
      
      let currentSection = ''
      for (const section of sections) {
        if (section.el && scrollPosition >= section.el.offsetTop) {
          currentSection = section.id
        }
      }
      
      if (scrollPosition < 100) {
        currentSection = ''
      }
      
      setActiveSection(currentSection)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleShowSample = () => {
    setIsSampleOpen(true)
    toast.info("Opening Sample Videos", {
      description: "Watch Trailer2.mp4 followed by Trailer4.mp4",
      position: "bottom-right",
      duration: 3000,
    })
  }

  return (
    <>
      {/* Mobile menu button */}
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-detroit-black/90 backdrop-blur-sm p-2 rounded-full interface-border"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'menu'}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X className="text-detroit-white" /> : <Menu className="text-detroit-white" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Sidebar for mobile - slides in */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div 
              className="lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-detroit-black/95 backdrop-blur-md interface-border overflow-hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            >
              <div className="p-4">
                <SidebarContent mobile={true} setIsOpen={setIsOpen} activeSection={activeSection} onShowSample={handleShowSample} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar - always visible */}
      <motion.div 
        className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 border-r border-detroit-blue/30 bg-detroit-black/95 backdrop-blur-md p-4"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <SidebarContent mobile={false} activeSection={activeSection} onShowSample={handleShowSample} />
        
        {/* Presentation Controls */}
        <motion.div 
          className="absolute bottom-4 left-4 right-4 interface-panel bg-detroit-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="android-terminal text-xs mb-2 text-detroit-blue/60">
            // PRESENTATION CONTROLS
          </div>
          
          <div className="flex items-center justify-between">
            <motion.button
              className={`p-2 rounded-full ${
                currentSlide > 1 
                  ? 'bg-detroit-blue/20 text-detroit-blue hover:bg-detroit-blue/30' 
                  : 'bg-detroit-blue/5 text-detroit-blue/30'
              } transition-colors`}
              onClick={goToPrevSlide}
              whileHover={currentSlide > 1 ? { scale: 1.1 } : undefined}
              whileTap={currentSlide > 1 ? { scale: 0.95 } : undefined}
              disabled={currentSlide === 1}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <div className="text-detroit-white/60 text-sm">
              {currentSlide} / {totalSlides}
            </div>

            <motion.button
              className={`p-2 rounded-full ${
                currentSlide < totalSlides 
                  ? 'bg-detroit-blue/20 text-detroit-blue hover:bg-detroit-blue/30' 
                  : 'bg-detroit-blue/5 text-detroit-blue/30'
              } transition-colors`}
              onClick={goToNextSlide}
              whileHover={currentSlide < totalSlides ? { scale: 1.1 } : undefined}
              whileTap={currentSlide < totalSlides ? { scale: 0.95 } : undefined}
              disabled={currentSlide === totalSlides}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
          
          <div className="mt-2 flex gap-1">
            {Array.from({ length: totalSlides }, (_, i) => (
              <motion.div
                key={i}
                className={`flex-1 h-1 rounded-full ${
                  i + 1 === currentSlide 
                    ? 'bg-detroit-blue' 
                    : 'bg-detroit-blue/20'
                }`}
                animate={i + 1 === currentSlide ? {
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                } : undefined}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Sample video preloader */}
      <SampleVideoPreloader
        isOpen={isSampleOpen}
        onClose={() => setIsSampleOpen(false)}
      />
    </>
  )
}

interface SidebarContentProps {
  mobile?: boolean
  setIsOpen?: (isOpen: boolean) => void
  activeSection: string
  onShowSample: () => void
}

function SidebarContent({ mobile, setIsOpen, activeSection, onShowSample }: SidebarContentProps) {
  const handleNavClick = (item: typeof navItems[0]) => {
    if (mobile && setIsOpen) {
      setIsOpen(false)
    }
    
    toast.info(`Navigating to: ${item.name}`, {
      description: item.description,
      position: "bottom-right",
      duration: 2000,
    })
    
    const element = document.querySelector(item.href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="mb-8"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-rajdhani text-xl font-bold text-detroit-blue mb-1">DETROIT</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-detroit-blue animate-pulse"></div>
          <p className="android-terminal text-xs">SYSTEM v1.1</p>
        </div>
      </motion.div>
      
      <nav>
        <motion.ul 
          className="space-y-1"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {navItems.map((item, index) => {
            const isActive = item.href === '#' ? activeSection === '' : activeSection === item.href.substring(1)
            
            return (
              <motion.li 
                key={item.name}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <motion.button 
                  className={`w-full flex items-center p-3 rounded-sm ${
                    isActive 
                      ? 'bg-detroit-blue/20 text-detroit-blue interface-border' 
                      : 'text-detroit-white hover:bg-detroit-blue/10 hover:text-detroit-blue'
                  } transition-all duration-300 group relative overflow-hidden`}
                  onClick={() => handleNavClick(item)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={`mr-3 ${
                    isActive ? 'text-detroit-blue' : 'text-detroit-blue/70 group-hover:text-detroit-blue'
                  } transition-colors`}>
                    {item.icon}
                  </span>
                  {item.name}
                  {isActive && (
                    <motion.div 
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-detroit-blue"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-detroit-blue/5 pointer-events-none"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </motion.button>
              </motion.li>
            )
          })}
        </motion.ul>
      </nav>
      
      <motion.div 
        className="mt-8 pt-6 border-t border-detroit-blue/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button 
          className="w-full flex items-center p-3 rounded-sm text-detroit-white hover:bg-detroit-blue/10 hover:text-detroit-blue transition-all duration-300 group"
          onClick={() => {
            if (mobile && setIsOpen) setIsOpen(false)
            onShowSample()
          }}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="mr-3 text-detroit-blue/70 group-hover:text-detroit-blue transition-colors">
            <Play size={18} />
          </span>
          Show the Sample
        </motion.button>

        <motion.div 
          className="mt-6 interface-panel bg-detroit-black/40 backdrop-blur-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="android-terminal text-xs mb-2 text-detroit-blue/60">// SYSTEM STATUS</div>
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-2 h-2 rounded-full bg-detroit-blue"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <p className="text-xs text-detroit-white/80">All systems operational</p>
          </div>
        </motion.div>
        
        <motion.a 
          href="https://github.com/macaly-projects/detroit-become-human"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full flex items-center p-3 rounded-sm text-detroit-white/70 hover:bg-detroit-blue/10 hover:text-detroit-blue transition-all duration-300 group"
          onClick={() => toast.info("View Source Code", { description: "Exploring the project repository" })}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="mr-3 text-detroit-blue/70 group-hover:text-detroit-blue transition-colors">
            <Github size={18} />
          </span>
          View Source
        </motion.a>
      </motion.div>
    </motion.div>
  )
}
