"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Volume2, VolumeX } from 'lucide-react'

const trailers = [
  { src: '/videos/Trailer3.mp4', type: 'video/mp4' },
  { src: '/videos/Trailer1.mp4', type: 'video/mp4' },
]

export default function VideoPreloader({ onComplete }: { onComplete: () => void }) {
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    
    const handleCanPlay = () => {
      console.log('Video can play')
      setIsLoading(false)
    }

    const handleLoadedData = () => {
      console.log('Video data loaded')
      setIsLoading(false)
    }

    const handleError = (e: Event) => {
      console.error('Video error:', video.error)
      setError(`Error loading video: ${video.error?.message || 'Unknown error'}`)
      setIsLoading(false)
    }

    const handleUserInteraction = () => {
      if (video.muted) {
        try {
          video.muted = false
          setIsMuted(false)
        } catch (e) {
          console.log('Could not unmute, browser policy may require explicit user interaction')
        }
      }
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('playing', handleCanPlay)
    video.addEventListener('error', handleError)
    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('touchstart', handleUserInteraction)

    if (video.readyState >= 3) {
      setIsLoading(false)
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('playing', handleCanPlay)
      video.removeEventListener('error', handleError)
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [currentTrailerIndex])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isVideoEnded) {
        onComplete()
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isVideoEnded, onComplete])

  const handleVideoEnd = () => {
    console.log('Video ended')
    if (currentTrailerIndex < trailers.length - 1) {
      setCurrentTrailerIndex(prevIndex => prevIndex + 1)
      setIsLoading(true)
    } else {
      setIsVideoEnded(true)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const video = videoRef.current
      video.muted = !video.muted
      setIsMuted(video.muted)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-detroit-black z-50 flex items-center justify-center"
      >
        {error ? (
          <div className="text-center p-8">
            <AlertTriangle className="text-detroit-red w-16 h-16 mx-auto mb-4" />
            <p className="text-detroit-white mb-4">{error}</p>
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.load()
                }
                setError(null)
                setIsLoading(true)
              }}
              className="px-4 py-2 bg-detroit-blue/20 text-detroit-blue border border-detroit-blue/50 hover:bg-detroit-blue/30 transition-colors font-rajdhani"
            >
              RETRY
            </button>
          </div>
        ) : (
          <>
            <video
              key={currentTrailerIndex}
              ref={videoRef}
              autoPlay
              playsInline
              muted={isMuted}
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
            >
              <source 
                src={trailers[currentTrailerIndex].src}
                type={trailers[currentTrailerIndex].type}
              />
              Your browser does not support the video tag.
            </video>
            
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-detroit-black/80"
                >
                  <div className="text-detroit-blue text-center">
                    <div className="w-16 h-16 border-4 border-detroit-blue/20 border-t-detroit-blue rounded-full animate-spin mb-4"></div>
                    <p className="font-rajdhani">Loading video...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={toggleMute}
              className="absolute bottom-8 right-8 px-4 py-2 bg-detroit-blue/20 text-detroit-blue border border-detroit-blue/50 hover:bg-detroit-blue/30 transition-colors font-rajdhani flex items-center gap-2"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              {isMuted ? 'UNMUTE' : 'MUTE'}
            </motion.button>

            {isMuted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-detroit-blue/20 text-detroit-blue border border-detroit-blue/50 px-4 py-2 font-rajdhani text-sm"
              >
                Click anywhere to play with sound
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
} 