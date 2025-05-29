"use client"

import { createContext, useContext, useState, useCallback } from 'react'
import { toast } from 'sonner'

interface PresentationContextType {
  currentSlide: number
  totalSlides: number
  goToNextSlide: () => void
  goToPrevSlide: () => void
  setTotalSlides: (total: number) => void
  currentSection: string
  setCurrentSection: (section: string) => void
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined)

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [totalSlides, setTotalSlides] = useState(1)
  const [currentSection, setCurrentSection] = useState('')

  // Reset slide count when changing sections
  const handleSectionChange = useCallback((section: string) => {
    setCurrentSection(section)
    setCurrentSlide(1)
  }, [])

  const goToNextSlide = useCallback(() => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(prev => prev + 1)
      toast.info(`${currentSection} - Slide ${currentSlide + 1} of ${totalSlides}`, {
        position: "bottom-right",
        duration: 2000,
      })
    }
  }, [currentSlide, totalSlides, currentSection])

  const goToPrevSlide = useCallback(() => {
    if (currentSlide > 1) {
      setCurrentSlide(prev => prev - 1)
      toast.info(`${currentSection} - Slide ${currentSlide - 1} of ${totalSlides}`, {
        position: "bottom-right",
        duration: 2000,
      })
    }
  }, [currentSlide, totalSlides, currentSection])

  return (
    <PresentationContext.Provider 
      value={{ 
        currentSlide, 
        totalSlides, 
        goToNextSlide, 
        goToPrevSlide,
        setTotalSlides,
        currentSection,
        setCurrentSection: handleSectionChange
      }}
    >
      {children}
    </PresentationContext.Provider>
  )
}

export function usePresentation() {
  const context = useContext(PresentationContext)
  if (context === undefined) {
    throw new Error('usePresentation must be used within a PresentationProvider')
  }
  return context
} 