"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Linkedin } from 'lucide-react'
import { toast } from "sonner"

export default function AboutSection() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  
  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }
  
  const faqs = [
    {
      id: 'about-game',
      question: 'What is Detroit: Become Human?',
      answer: 'Detroit: Become Human is a narrative adventure game developed by Lojitha Shaad and released in 2025. Set in 2038, it explores a world where androids designed to look and behave like humans start developing emotions and free will. The game follows three android protagonists—Connor, Kara, and Markus—as they navigate the consequences of emerging consciousness.'
    },
    {
      id: 'gameplay',
      question: 'How does the game play?',
      answer: 'The game features a branching narrative where player choices significantly impact the story. Gameplay includes exploration, dialogue choices, quick-time events (QTEs), and crime scene investigations. Each decision can lead to different outcomes, including character deaths and alternate story paths, all visualized through detailed flowcharts at the end of each chapter.'
    },
    {
      id: 'about-presentation',
      question: 'What is this presentation?',
      answer: 'This interactive web presentation was created by Lojitha, Ravindi, Sathmi, Humaidha, ad Rivinu to explore the narrative, characters, gameplay mechanics, and philosophical themes of Detroit: Become Human. It demonstrates interactive web development techniques while providing insights into the game\'s exploration of consciousness, identity, and civil rights.'
    },
    {
      id: 'technologies',
      question: 'What technologies were used?',
      answer: 'This presentation was built using Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. The interface design draws inspiration from the game\'s futuristic aesthetic, with interactive elements that mirror gameplay concepts like choice-based narratives and QTEs.'
    }
  ]

  return (
    <section id="about" className="mb-16">
      <div className="mb-8">
        <h2 className="font-rajdhani text-3xl font-bold text-detroit-white mb-2">ABOUT THIS PRESENTATION</h2>
        <p className="text-detroit-white/70">Learn more about this interactive web presentation and the game it explores.</p>
      </div>
      
      <div className="interface-panel">
        <div className="mb-8">
          <p className="text-detroit-white/80">
            This interactive presentation was created as an educational demonstration of Detroit: Become Human's key themes, characters, and gameplay elements.
            Navigate through the different sections to explore the world of Detroit, interact with game mechanics, and discover its philosophical underpinnings.
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <div className="space-y-4 mb-8">
          <h3 className="font-rajdhani text-xl font-bold text-detroit-blue mb-4">FREQUENTLY ASKED QUESTIONS</h3>
          
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="interface-border overflow-hidden"
            >
              <button 
                className="w-full p-4 flex justify-between items-center bg-detroit-blue/10 text-left"
                onClick={() => toggleFaq(faq.id)}
              >
                <span className="font-rajdhani font-bold text-detroit-white">{faq.question}</span>
                <span className="text-detroit-blue text-lg">{expandedFaq === faq.id ? '−' : '+'}</span>
              </button>
              
              {expandedFaq === faq.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-detroit-black/40"
                >
                  <p className="text-detroit-white/70">{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
        
        {/* Credits */}
        <div className="mb-8">
          <h3 className="font-rajdhani text-xl font-bold text-detroit-blue mb-4">CREDITS & REFERENCES</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-rajdhani font-bold text-detroit-white mb-2">Game Information</h4>
              <ul className="space-y-2 text-sm text-detroit-white/70">
                <li className="flex items-start">
                  <span className="text-detroit-blue mr-2">•</span>
                  <span>Detroit: Become Human is developed by Lojitha Shaad and published by Interactive Entertainment (2025).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-detroit-blue mr-2">•</span>
                  <span>All game content, characters, and imagery are the property of their respective owners.</span>
                </li>
                <li className="flex items-center">
                  <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-detroit-blue hover:underline"
                    onClick={() => toast.info("Opening external link", { description: "Redirecting to Quantic Dream's official site" })}
                  >
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-rajdhani font-bold text-detroit-white mb-2">Presentation Created By</h4>
              <ul className="space-y-2 text-sm text-detroit-white/70">
                <li className="flex items-start">
                  <span className="text-detroit-blue mr-2">•</span>
                  <span>interactive web presentation.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-detroit-blue mr-2">•</span>
                  <span>Built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.</span>
                </li>
                <li className="flex items-center">
                  <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-detroit-blue hover:underline"
                    onClick={() => toast.info("Opening external link", { description: "Redirecting to the project repository" })}
                  >
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}