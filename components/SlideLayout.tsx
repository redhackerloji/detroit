"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'

interface SlideLayoutProps {
  children: React.ReactNode
  slideNumber: number
  totalSlides: number
  title: string
  onNext?: () => void
  onPrev?: () => void
}

export default function SlideLayout({ 
  children, 
  slideNumber, 
  totalSlides, 
  title,
  onNext,
  onPrev
}: SlideLayoutProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && onNext) {
        onNext()
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onNext, onPrev])

  return (
    <motion.div 
      className="min-h-screen relative flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Grid */}
      <div className="fixed inset-0 grid-bg-overlay opacity-10 pointer-events-none"></div>
      
      {/* Slide Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-detroit-black/90 backdrop-blur-md border-b border-detroit-blue/30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="android-terminal text-detroit-blue text-sm">
              // SLIDE {slideNumber.toString().padStart(2, '0')}
            </div>
            <h1 className="font-rajdhani text-lg text-detroit-white">{title}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-detroit-white/60 text-sm">
              {slideNumber} / {totalSlides}
            </div>
            <div className="w-32 h-1 bg-detroit-blue/20 rounded-full overflow-hidden ml-4">
              <motion.div 
                className="h-full bg-detroit-blue"
                initial={{ width: 0 }}
                animate={{ width: `${(slideNumber / totalSlides) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-detroit-black/90 backdrop-blur-md border-t border-detroit-blue/30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <motion.button
            className={`p-2 rounded-full ${
              onPrev 
                ? 'bg-detroit-blue/20 text-detroit-blue hover:bg-detroit-blue/30' 
                : 'bg-detroit-blue/5 text-detroit-blue/30'
            } transition-colors`}
            onClick={() => {
              if (onPrev && !isTransitioning) {
                setIsTransitioning(true)
                onPrev()
                setTimeout(() => setIsTransitioning(false), 500)
              }
            }}
            whileHover={onPrev ? { scale: 1.1 } : undefined}
            whileTap={onPrev ? { scale: 0.95 } : undefined}
            disabled={!onPrev || isTransitioning}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="flex gap-2">
            {Array.from({ length: totalSlides }, (_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i + 1 === slideNumber 
                    ? 'bg-detroit-blue' 
                    : 'bg-detroit-blue/20'
                }`}
                animate={i + 1 === slideNumber ? {
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

          <motion.button
            className={`p-2 rounded-full ${
              onNext 
                ? 'bg-detroit-blue/20 text-detroit-blue hover:bg-detroit-blue/30' 
                : 'bg-detroit-blue/5 text-detroit-blue/30'
            } transition-colors`}
            onClick={() => {
              if (onNext && !isTransitioning) {
                setIsTransitioning(true)
                onNext()
                setTimeout(() => setIsTransitioning(false), 500)
              }
            }}
            whileHover={onNext ? { scale: 1.1 } : undefined}
            whileTap={onNext ? { scale: 0.95 } : undefined}
            disabled={!onNext || isTransitioning}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-20 right-4 p-4 bg-detroit-black/90 backdrop-blur-md interface-border rounded-lg opacity-0 hover:opacity-100 transition-opacity">
        <div className="android-terminal text-xs text-detroit-blue/60 mb-2">// KEYBOARD SHORTCUTS</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-detroit-blue/10 text-detroit-blue rounded">←</kbd>
            <span className="text-detroit-white/60">Previous slide</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-detroit-blue/10 text-detroit-blue rounded">→</kbd>
            <span className="text-detroit-white/60">Next slide</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 