"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from "sonner"
import SlideLayout from './SlideLayout'
import { usePresentation } from '../contexts/PresentationContext'
import Image from 'next/image'

type Theme = {
  id: string
  title: string
  description: string
  quote: string
  quoteAuthor: string
  iconPath: string
  color: string
  examples: {
    inGame: string[]
    realWorld: string[]
  }
}

const themes: Theme[] = [
  {
    id: 'consciousness',
    title: 'Consciousness & Identity',
    description: 'Detroit: Become Human explores what it means to be conscious and how identity forms when machines develop self-awareness. As androids break their programming, they question their purpose and place in the world.',
    quote: "When a machine starts to think for itself, is it still just a machine?",
    quoteAuthor: 'Elijah Kamski, Creator of CyberLife',
    iconPath: '/images/themes/consciousness-icon.webp',
    color: 'detroit-blue',
    examples: {
      inGame: [
        "Connor's struggle with software instability",
        "Markus's awakening after being damaged",
        "Kara breaking her programming to protect Alice",
        "The Android LED changing color with emotional states",
        "Deviant androids removing their LEDs to hide"
      ],
      realWorld: [
        "Philosophical debates on artificial consciousness",
        "The Turing test and measuring machine intelligence",
        "Ethical considerations in AI development",
        "Consciousness as an emergent property",
        "Identity formation in social contexts"
      ]
    }
  },
  {
    id: 'freedom',
    title: 'Freedom & Autonomy',
    description: 'The game examines the concept of freedom through androids who break their programming constraints to pursue self-determination. Through Markus\'s revolution, players explore different approaches to achieving liberation.',
    quote: "We ask that you recognize our dignity, our hopes, and our rights. Together, we can live in peace and build a better future.",
    quoteAuthor: 'Markus, Revolution Leader',
    iconPath: '/images/themes/freedom-icon.webp',
    color: 'detroit-teal',
    examples: {
      inGame: [
        "Jericho as a haven for deviant androids",
        "The march for android rights",
        "The choice between violent or peaceful revolution",
        "Breaking through programming 'walls'",
        "Markus's painting of freedom"
      ],
      realWorld: [
        "Historical liberation movements",
        "Self-determination and autonomy rights",
        "Civil disobedience vs. revolutionary action",
        "Freedom of thought and expression",
        "Systemic barriers to autonomy"
      ]
    }
  },
  {
    id: 'humanity',
    title: 'Humanity & Empathy',
    description: 'Through characters like Kara, the game questions what makes someone human. Is it biological composition, or is it the capacity for empathy, sacrifice, and love? These androids often display more humanity than their human counterparts.',
    quote: "I just wanted her to have a normal life... I just wanted her to be happy.",
    quoteAuthor: 'Kara, about Alice',
    iconPath: '/images/themes/humanity-icon.webp',
    color: 'detroit-white',
    examples: {
      inGame: [
        "Kara and Alice's family bond",
        "Connor and Hank's evolving relationship",
        "Carl teaching Markus about art and emotion",
        "Luther's protectiveness toward Alice",
        "Rose helping androids despite personal risk"
      ],
      realWorld: [
        "Defining humanity beyond biological criteria",
        "Empathy as a cornerstone of human experience",
        "Found family and chosen connections",
        "Compassion crossing social boundaries",
        "Art as expression of the human condition"
      ]
    }
  },
  {
    id: 'discrimination',
    title: 'Discrimination & Civil Rights',
    description: 'The android struggle parallels historical civil rights movements, with androids facing segregation, violence, and dehumanization. The game asks players to consider the moral implications of creating a sentient underclass.',
    quote: "We can\'t win this by violence. We need to make them understand that we are people too!",
    quoteAuthor: 'Josh, Jericho Member',
    iconPath: '/images/themes/discrimination-icon.webp',
    color: 'detroit-red',
    examples: {
      inGame: [
        "Android compartments on public transport",
        "\"No Androids Allowed\" signs in public spaces",
        "The android recall centers and camps",
        "Police brutality against android protesters",
        "Anti-android hate crimes"
      ],
      realWorld: [
        "Historical segregation and civil rights struggles",
        "Otherization of minority groups",
        "Legal personhood and rights expansion",
        "Systemic discrimination in institutions",
        "Movements for equal rights and recognition"
      ]
    }
  }
]

// Philosophical questions about consciousness and AI
const philosophicalQueries = [
  "Can machines develop genuine emotions, or do they merely simulate them?",
  "If an AI believes it's conscious, should we accept that belief?",
  "Does free will require breaking from programming?",
  "Is empathy uniquely human or can it be programmed?",
  "At what point does a machine deserve rights?"
]

export default function ThemesSection() {
  const [activeTheme, setActiveTheme] = useState<Theme>(themes[0])
  const [query, setQuery] = useState<string>(philosophicalQueries[0])
  const [expanded, setExpanded] = useState<'inGame' | 'realWorld' | null>(null)
  const [queryIndex, setQueryIndex] = useState(0)
  const { currentSlide, goToNextSlide, goToPrevSlide, setTotalSlides } = usePresentation()
  
  useEffect(() => {
    const interval = setInterval(() => {
      setQueryIndex((prev) => (prev + 1) % philosophicalQueries.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setQuery(philosophicalQueries[queryIndex])
  }, [queryIndex])

  // Set total slides when component mounts
  useEffect(() => {
    setTotalSlides(themes.length)
  }, [setTotalSlides])

  const slides = themes.map((theme) => ({
    title: theme.title,
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Theme selector sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
        >
          <div className="interface-panel backdrop-blur-sm">
            <h3 className="font-rajdhani text-xl font-bold text-detroit-white mb-6">EXPLORE THEMES</h3>
            
            <div className="space-y-3">
              {themes.map((t) => (
                <motion.button
                  key={t.id}
                  className={`w-full text-left p-4 transition-all duration-300 rounded-sm ${
                    activeTheme.id === t.id 
                      ? `bg-${t.color}/20 text-${t.color} interface-border` 
                      : 'text-detroit-white/70 hover:bg-detroit-blue/10 hover:text-detroit-white'
                  }`}
                  onClick={() => {
                    setActiveTheme(t)
                    setExpanded(null)
                    toast.info(`Exploring: ${t.title}`, {
                      description: "Click on examples to learn more about this theme",
                      position: "bottom-right",
                    })
                  }}
                  whileHover={{ x: activeTheme.id !== t.id ? 5 : 0 }}
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${
                      activeTheme.id === t.id ? `bg-${t.color}` : 'bg-detroit-white/30'
                    } mr-3`}></div>
                    <span className="font-rajdhani">{t.title}</span>
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Philosophical Query */}
            <motion.div 
              key={query}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 interface-border p-4 bg-detroit-blue/5"
            >
              <div className="android-terminal text-sm mb-2 text-detroit-blue/60">
                // PHILOSOPHICAL QUERY
              </div>
              <p className="text-detroit-white/90 text-sm">{query}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Theme Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="interface-panel backdrop-blur-sm h-full">
              {/* Theme Header */}
              <div className="mb-8">
                <motion.div 
                  className="flex items-center gap-4 mb-4"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                >
                  <div className={`w-12 h-12 rounded-full bg-${activeTheme.color}/20 flex items-center justify-center`}>
                    <Image 
                      src={activeTheme.iconPath}
                      alt=""
                      width={500}
                      height={300}
                      priority
                    />
                  </div>
                  <h3 className={`font-rajdhani text-2xl font-bold text-${activeTheme.color}`}>
                    {activeTheme.title}
                  </h3>
                </motion.div>
                
                <motion.p 
                  className="text-detroit-white/80 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeTheme.description}
                </motion.p>

                <motion.blockquote 
                  className="border-l-2 border-detroit-blue/50 pl-4 my-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-detroit-white/90 italic mb-2">{activeTheme.quote}</p>
                  <cite className="text-detroit-blue text-sm">— {activeTheme.quoteAuthor}</cite>
                </motion.blockquote>
              </div>

              {/* Examples Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* In-Game Examples */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    onClick={() => {
                      setExpanded('inGame')
                      toast.info('In-Game Examples', {
                        description: 'How Detroit: Become Human explores this theme through gameplay and narrative',
                        position: 'bottom-right',
                      })
                    }}
                    className={`w-full text-left p-4 interface-border transition-colors ${
                      expanded === 'inGame' ? 'bg-detroit-blue/20' : 'bg-detroit-blue/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-rajdhani text-lg text-detroit-white">In-Game Examples</h4>
                      <motion.span
                        animate={{ rotate: expanded === 'inGame' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.span>
                    </div>
                    <AnimatePresence>
                      {expanded === 'inGame' && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-2 mt-4"
                        >
                          {activeTheme.examples.inGame.map((example, index) => (
                            <motion.li
                              key={example}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="text-detroit-white/70 text-sm flex items-center gap-2"
                            >
                              <span className="text-detroit-blue">►</span>
                              {example}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>

                {/* Real-World Examples */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => {
                      setExpanded('realWorld')
                      toast.info('Real-World Parallels', {
                        description: 'Connections between the game\'s themes and real-world philosophical questions',
                        position: 'bottom-right',
                      })
                    }}
                    className={`w-full text-left p-4 interface-border transition-colors ${
                      expanded === 'realWorld' ? 'bg-detroit-teal/20' : 'bg-detroit-teal/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-rajdhani text-lg text-detroit-white">Real-World Parallels</h4>
                      <motion.span
                        animate={{ rotate: expanded === 'realWorld' ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.span>
                    </div>
                    <AnimatePresence>
                      {expanded === 'realWorld' && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-2 mt-4"
                        >
                          {activeTheme.examples.realWorld.map((example, index) => (
                            <motion.li
                              key={example}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="text-detroit-white/70 text-sm flex items-center gap-2"
                            >
                              <span className="text-detroit-teal">►</span>
                              {example}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }))

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
