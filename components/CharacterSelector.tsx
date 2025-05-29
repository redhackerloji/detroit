"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Character {
  id: string
  name: string
  model: string
  role: string
  description: string
  image: string
  stats: {
    intelligence: number
    strength: number
    speed: number
    determination: number
  }
}

const characters: Character[] = [
  {
    id: 'connor',
    name: 'CONNOR',
    model: 'RK800',
    role: 'The Detective',
    description: 'A prototype detective android tasked with hunting down deviants. Analytical, efficient, and potentially deviant himself.',
    image: '/images/characters/connor.webp',
    stats: {
      intelligence: 95,
      strength: 80,
      speed: 85,
      determination: 90
    }
  },
  {
    id: 'markus',
    name: 'MARKUS',
    model: 'RK200',
    role: 'The Leader',
    description: 'A caretaker android who becomes the leader of the android revolution. Charismatic, strategic, and fighting for freedom.',
    image: '/images/characters/markus.webp',
    stats: {
      intelligence: 90,
      strength: 85,
      speed: 80,
      determination: 95
    }
  },
  {
    id: 'kara',
    name: 'KARA',
    model: 'AX400',
    role: 'The Protector',
    description: 'A domestic android who develops a strong bond with a young girl. Compassionate, determined, and fiercely protective.',
    image: '/images/characters/kara.webp',
    stats: {
      intelligence: 85,
      strength: 75,
      speed: 90,
      determination: 100
    }
  }
]

export default function CharacterSelector() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <section className="w-full py-16 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg-overlay opacity-10"></div>
      
      {/* Section Title */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-rajdhani font-bold text-detroit-white detroit-glow mb-4"
        >
          CHOOSE YOUR PATH
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-detroit-white/70 max-w-2xl mx-auto"
        >
          Three distinct stories intertwine in the city of Detroit. Each character faces unique challenges that will test their beliefs and humanity.
        </motion.p>
      </div>

      {/* Character Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {characters.map((character, index) => (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => {
                setSelectedCharacter(character)
                setIsHovering(true)
              }}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Character Card */}
              <div className="relative aspect-[3/4] overflow-hidden interface-border bg-detroit-black/40">
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={500}
                    height={300}
                    priority
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-detroit-black via-detroit-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="relative z-10">
                    <div className="mb-2 opacity-70">
                      <span className="text-detroit-blue font-mono text-sm">{character.model}</span>
                    </div>
                    <h3 className="text-3xl font-rajdhani font-bold text-detroit-white mb-2">{character.name}</h3>
                    <p className="text-detroit-white/80 text-sm mb-4">{character.role}</p>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-detroit-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Character Details Overlay */}
      <AnimatePresence>
        {selectedCharacter && isHovering && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-detroit-black/95 backdrop-blur-md border-t border-detroit-blue/20 p-6 z-50"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Character Info */}
                <div>
                  <h3 className="text-2xl font-rajdhani font-bold text-detroit-white mb-2">
                    {selectedCharacter.name}
                    <span className="text-detroit-blue ml-2 text-lg">
                      {selectedCharacter.model}
                    </span>
                  </h3>
                  <p className="text-detroit-white/80 mb-4">{selectedCharacter.description}</p>
                </div>

                {/* Character Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedCharacter.stats).map(([stat, value]) => (
                    <div key={stat} className="relative">
                      <div className="flex justify-between mb-1">
                        <span className="text-detroit-white/70 text-sm uppercase">{stat}</span>
                        <span className="text-detroit-blue text-sm">{value}%</span>
                      </div>
                      <div className="h-1 bg-detroit-blue/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full bg-detroit-blue"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}