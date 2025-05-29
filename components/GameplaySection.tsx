"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QTEDemo from './QTEDemo'
import StoryFlowchart from './StoryFlowchart'
import SlideLayout from './SlideLayout'
import { usePresentation } from '../contexts/PresentationContext'

const features = [
  {
    id: 'investigation',
    title: 'INVESTIGATION MODE',
    description: 'As Connor, analyze crime scenes to reconstruct events and find clues that others missed.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    color: 'blue'
  },
  {
    id: 'dialogue',
    title: 'DIALOGUE CHOICES',
    description: 'Your dialogue choices influence character relationships and story outcomes.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    color: 'teal'
  },
  {
    id: 'qte',
    title: 'QUICK TIME EVENTS',
    description: 'React quickly to on-screen prompts during intense action sequences.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    color: 'red'
  }
]

export default function GameplaySection() {
  const [selectedCharacter, setSelectedCharacter] = useState<'connor' | 'kara' | 'markus'>('connor')
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const { currentSlide, goToNextSlide, goToPrevSlide, setTotalSlides } = usePresentation()

  const slides = [
    {
      title: "GAMEPLAY FEATURES",
      content: (
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-rajdhani text-4xl md:text-5xl font-bold text-detroit-white detroit-glow mb-4">
              GAMEPLAY FEATURES
            </h2>
            <p className="text-detroit-white/70 max-w-2xl mx-auto">
              Explore the core mechanics that shape your experience in Detroit: Become Human.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                onHoverStart={() => setHoveredFeature(feature.id)}
                onHoverEnd={() => setHoveredFeature(null)}
                className="relative"
              >
                <div className={`interface-panel backdrop-blur-sm transition-all duration-300 ${hoveredFeature === feature.id ? 'bg-detroit-black/60' : 'bg-detroit-black/40'}`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 flex items-center justify-center bg-detroit-${feature.color}/20 text-detroit-${feature.color} rounded-full mr-3`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-rajdhani text-xl font-bold text-detroit-white">{feature.title}</h3>
                  </div>
                  <p className="text-detroit-white/70 mb-6">{feature.description}</p>
                  
                  {feature.id === 'investigation' && (
                    <div className="h-40 bg-detroit-black/40 interface-border flex items-center justify-center group">
                      <motion.div
                        animate={{
                          scale: hoveredFeature === feature.id ? 1.05 : 1,
                          opacity: hoveredFeature === feature.id ? 0.8 : 0.4
                        }}
                        className="w-full h-full bg-[url('/images/gameplay/investigation.webp')] bg-cover bg-center"
                      >
                        <div className="h-full w-full flex items-center justify-center backdrop-blur-sm">
                          <p className="android-terminal text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                            // Analyzing crime scene data...
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  )}
                  
                  {feature.id === 'dialogue' && (
                    <div className="space-y-2">
                      {['Tell the truth', 'Lie to protect Alice', 'Remain silent'].map((choice, i) => (
                        <motion.div
                          key={choice}
                          whileHover={{ x: 10 }}
                          className={`p-2 interface-border bg-detroit-${['blue', 'teal', 'red'][i]}/5 text-detroit-white/90 hover:bg-detroit-${['blue', 'teal', 'red'][i]}/10 transition-colors cursor-pointer`}
                        >
                          <span className="text-sm">► {choice}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  
                  {feature.id === 'qte' && (
                    <div className="flex justify-center space-x-3">
                      {['R', 'T', 'X'].map((key, i) => (
                        <motion.div
                          key={key}
                          animate={{
                            scale: i === 1 && hoveredFeature === feature.id ? 1.1 : 1,
                            borderColor: i === 1 ? '#1E88E5' : i === 2 ? 'rgba(255,255,255,0.3)' : '#1E88E5'
                          }}
                          className={`w-10 h-10 flex items-center justify-center border text-${i === 2 ? 'detroit-white/30' : 'detroit-blue'} font-mono ${i === 1 ? 'animate-pulse' : ''}`}
                        >
                          {key}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Hover effect border */}
                <AnimatePresence>
                  {hoveredFeature === feature.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 border-2 border-detroit-${feature.color} pointer-events-none`}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "QUICK TIME EVENTS",
      content: (
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <QTEDemo />
          </motion.div>
        </div>
      )
    },
    {
      title: "CHARACTER STORYLINES",
      content: (
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="font-rajdhani text-3xl font-bold text-detroit-white mb-4">CHARACTER STORYLINES</h3>
            <p className="text-detroit-white/70 mb-8">Explore the branching narrative paths for each character.</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {(['connor', 'kara', 'markus'] as const).map((character) => (
                <motion.button
                  key={character}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 interface-border font-rajdhani relative overflow-hidden ${
                    selectedCharacter === character 
                      ? 'bg-detroit-blue text-detroit-white' 
                      : 'bg-transparent text-detroit-white/60 hover:bg-detroit-blue/10 hover:text-detroit-white/80'
                  } transition-colors`}
                  onClick={() => setSelectedCharacter(character)}
                >
                  {selectedCharacter === character && (
                    <motion.div
                      layoutId="active-character"
                      className="absolute inset-0 bg-detroit-blue/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{character.toUpperCase()}</span>
                </motion.button>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCharacter}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StoryFlowchart character={selectedCharacter} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      )
    }
  ]

  // Set total slides when component mounts
  useEffect(() => {
    setTotalSlides(slides.length)
  }, [setTotalSlides])

  const currentSlideData = slides[currentSlide - 1]

  return (
    <SlideLayout
      slideNumber={currentSlide}
      totalSlides={slides.length}
      title={currentSlideData.title}
      onNext={currentSlide < slides.length ? goToNextSlide : undefined}
      onPrev={currentSlide > 1 ? goToPrevSlide : undefined}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          {currentSlideData.content}
        </motion.div>
      </AnimatePresence>
    </SlideLayout>
  )
}
