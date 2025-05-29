"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Volume2, VolumeX, Minimize, Maximize, X } from 'lucide-react'
import { getAssetPath } from '../utils/paths'

const trailers = [
  { src: getAssetPath('/videos/Trailer 2.mp4'), type: 'video/mp4' },
  { src: getAssetPath('/videos/Trailer4.mp4'), type: 'video/mp4' },
]

export default function SampleVideoPreloader({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

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

    const handlePlaying = () => {
      console.log('Video is playing')
      setIsLoading(false)
    }

    const handleError = (e: Event) => {
      console.error('Video error:', video.error)
      setError(`Error loading video: ${video.error?.message || 'Unknown error'}`)
      setIsLoading(false)
    }

    const handleStalled = () => {
      console.log('Video stalled')
      if (video.readyState < 3) {
        setIsLoading(true)
      }
    }

    const handleWaiting = () => {
      console.log('Video waiting')
      setIsLoading(true)
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
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('error', handleError)
    video.addEventListener('stalled', handleStalled)
    video.addEventListener('waiting', handleWaiting)
    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('touchstart', handleUserInteraction)

    if (video.readyState >= 3) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('error', handleError)
      video.removeEventListener('stalled', handleStalled)
      video.removeEventListener('waiting', handleWaiting)
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [currentTrailerIndex])

  useEffect(() => {
    if (isVideoEnded) {
      onClose()
    }
  }, [isVideoEnded, onClose])

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
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
          <div className="relative w-full h-full">
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

            <div className="absolute top-4 right-4 flex items-center gap-4">
              <button
                onClick={toggleFullscreen}
                className="text-detroit-white hover:text-detroit-blue transition-colors"
              >
                {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
              </button>

              <button
                onClick={onClose}
                className="text-detroit-white hover:text-detroit-blue transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
} 