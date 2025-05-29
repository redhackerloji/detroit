"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PresentationProvider } from '../contexts/PresentationContext'
import NavSidebar from './NavSidebar'
import VideoPreloader from './VideoPreloader'

interface PresentationWrapperProps {
  children: React.ReactNode
}

export default function PresentationWrapper({ children }: PresentationWrapperProps) {
  const [showPreloader, setShowPreloader] = useState(true)

  // Handle keyboard shortcuts for fullscreen
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <PresentationProvider>
      <div className="min-h-screen bg-detroit-black text-detroit-white">
        {showPreloader ? (
          <VideoPreloader onComplete={() => setShowPreloader(false)} />
        ) : (
          <>
            <NavSidebar />
            
            {/* Main Content */}
            <main className="lg:pl-64">
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </main>

            {/* Fullscreen Instructions */}
            <motion.div 
              className="fixed bottom-4 right-4 p-4 bg-detroit-black/90 backdrop-blur-md interface-border rounded-lg opacity-0 hover:opacity-100 transition-opacity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="android-terminal text-xs text-detroit-blue/60 mb-2">
                // PRESENTATION MODE
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-detroit-blue/10 text-detroit-blue rounded">F</kbd>
                <span className="text-detroit-white/60 text-xs">Toggle fullscreen</span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </PresentationProvider>
  )
} 