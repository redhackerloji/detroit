"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { toast } from "sonner"

type QTEType = 'press' | 'mash' | 'sequence'
type QTEKey = 'Q' | 'E' | 'R' | 'T' | 'X' | 'Z' | 'C' | 'Space' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'

type QTEConfig = {
  type: QTEType
  keys: QTEKey[]
  timeLimit: number // in milliseconds
  description: string
  result: {
    success: string
    failure: string
  }
}

export default function QTEDemo() {
  const [activeQTE, setActiveQTE] = useState<QTEConfig | null>(null)
  const [qteState, setQteState] = useState<'idle' | 'active' | 'success' | 'failure'>('idle')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState('')
  const [keyPresses, setKeyPresses] = useState<QTEKey[]>([])
  const [simulateMode, setSimulateMode] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const simulateTimerRef = useRef<NodeJS.Timeout | null>(null)
  const pressCountRef = useRef(0)
  
  console.log('QTE state:', qteState)
  
  // QTE scenarios
  const qteSamples: QTEConfig[] = [
    {
      type: 'press',
      keys: ['Space'],
      timeLimit: 3000,
      description: 'Connor reaches for his gun as the deviant android makes a sudden move.',
      result: {
        success: 'Connor quickly draws his weapon, causing the deviant to back down.',
        failure: 'Connor hesitates, allowing the deviant to escape through the window.'
      }
    },
    {
      type: 'mash',
      keys: ['X'],
      timeLimit: 5000,
      description: 'Kara struggles to break down a locked door to escape the house.',
      result: {
        success: 'With determined effort, Kara breaks through the door and escapes with Alice.',
        failure: 'Kara fails to break through in time, forcing them to find another exit route.'
      }
    },
    {
      type: 'sequence',
      keys: ['ArrowUp', 'ArrowRight', 'Space', 'ArrowDown'],
      timeLimit: 7000,
      description: 'Markus navigates through a treacherous junkyard, climbing over broken android parts.',
      result: {
        success: 'Markus successfully climbs out of the android graveyard and reaches freedom.',
        failure: 'Markus slips and falls back into the pit, sustaining damage to his biocomponents.'
      }
    }
  ]
  
  // Simulate key press for demonstration
  const simulateKeyPress = (key: QTEKey) => {
    const event = new KeyboardEvent('keydown', {
      code: key === 'Space' ? 'Space' :
            key === 'ArrowUp' ? 'ArrowUp' :
            key === 'ArrowDown' ? 'ArrowDown' :
            key === 'ArrowLeft' ? 'ArrowLeft' :
            key === 'ArrowRight' ? 'ArrowRight' :
            `Key${key}`
    })
    window.dispatchEvent(event)
    
    // Visual feedback
    toast.info(`Key Pressed: ${key}`, {
      position: "bottom-right",
      duration: 1000
    })
  }
  
  // Effect to handle keyboard input during QTE
  useEffect(() => {
    if (qteState !== 'active' || !activeQTE) return
    
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.code === 'Space' ? 'Space' : 
                 e.code === 'KeyQ' ? 'Q' :
                 e.code === 'KeyE' ? 'E' :
                 e.code === 'KeyR' ? 'R' :
                 e.code === 'KeyT' ? 'T' :
                 e.code === 'KeyX' ? 'X' :
                 e.code === 'KeyZ' ? 'Z' :
                 e.code === 'KeyC' ? 'C' :
                 e.code === 'ArrowUp' ? 'ArrowUp' :
                 e.code === 'ArrowDown' ? 'ArrowDown' :
                 e.code === 'ArrowLeft' ? 'ArrowLeft' :
                 e.code === 'ArrowRight' ? 'ArrowRight' : null
      
      if (!key || !activeQTE.keys.includes(key as QTEKey)) return
      
      e.preventDefault()
      console.log(`Key pressed: ${key}`);
      
      // Handle different QTE types
      switch (activeQTE.type) {
        case 'press':
          // For press, any correct key press immediately succeeds
          clearTimeout(timerRef.current!)
          setQteState('success')
          setResult(activeQTE.result.success)
          break
          
        case 'mash':
          // For mash, increment counter and update progress
          pressCountRef.current++
          const targetPresses = 10 // Require 10 presses to succeed
          const newProgress = Math.min(100, (pressCountRef.current / targetPresses) * 100)
          setProgress(newProgress)
          
          if (newProgress >= 100) {
            clearTimeout(timerRef.current!)
            setQteState('success')
            setResult(activeQTE.result.success)
          }
          break
          
        case 'sequence':
          // For sequence, track key presses in order
          const updatedPresses = [...keyPresses, key as QTEKey]
          setKeyPresses(updatedPresses)
          
          // Check if sequence is correct so far
          const isCorrectSoFar = updatedPresses.every(
            (k, i) => k === activeQTE.keys[i]
          )
          
          if (!isCorrectSoFar) {
            clearTimeout(timerRef.current!)
            setQteState('failure')
            setResult(activeQTE.result.failure)
            return
          }
          
          // Update progress
          const sequenceProgress = Math.min(100, (updatedPresses.length / activeQTE.keys.length) * 100)
          setProgress(sequenceProgress)
          
          // Check if sequence is complete
          if (updatedPresses.length === activeQTE.keys.length) {
            clearTimeout(timerRef.current!)
            setQteState('success')
            setResult(activeQTE.result.success)
          }
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [activeQTE, qteState, keyPresses])
  
  // Set up automatic simulation mode
  useEffect(() => {
    if (simulateMode && activeQTE && qteState === 'active') {
      let currentIndex = 0;
      
      if (activeQTE.type === 'press') {
        // For press QTE, wait a random time then press
        const delay = Math.random() * 1500 + 500; // Between 0.5 and 2 seconds
        simulateTimerRef.current = setTimeout(() => {
          simulateKeyPress(activeQTE.keys[0]);
        }, delay);
      } 
      else if (activeQTE.type === 'mash') {
        // For mash QTE, press repeatedly
        const interval = setInterval(() => {
          simulateKeyPress(activeQTE.keys[0]);
          if (qteState !== 'active') {
            clearInterval(interval);
          }
        }, 300); // Press every 300ms
        
        simulateTimerRef.current = setTimeout(() => clearInterval(interval), activeQTE.timeLimit);
      }
      else if (activeQTE.type === 'sequence') {
        // For sequence QTE, press keys in sequence with delays
        const pressNextKey = () => {
          if (currentIndex < activeQTE.keys.length && qteState === 'active') {
            simulateKeyPress(activeQTE.keys[currentIndex]);
            currentIndex++;
            if (currentIndex < activeQTE.keys.length) {
              simulateTimerRef.current = setTimeout(pressNextKey, 800); // Press next key after 800ms
            }
          }
        };
        
        simulateTimerRef.current = setTimeout(pressNextKey, 1000); // Start after 1 second
      }
    }
    
    return () => {
      if (simulateTimerRef.current) {
        clearTimeout(simulateTimerRef.current);
      }
    };
  }, [simulateMode, activeQTE, qteState]);
  
  const startQTE = (qteConfig: QTEConfig) => {
    // Reset state
    setActiveQTE(qteConfig)
    setQteState('active')
    setProgress(0)
    setResult('')
    setKeyPresses([])
    pressCountRef.current = 0
    
    // Set up timer for failure
    if (timerRef.current) clearTimeout(timerRef.current)
    if (simulateTimerRef.current) clearTimeout(simulateTimerRef.current)
    
    timerRef.current = setTimeout(() => {
      if (qteState === 'active') {
        setQteState('failure')
        setResult(qteConfig.result.failure)
      }
    }, qteConfig.timeLimit)
    
    console.log(`Started ${qteConfig.type} QTE with ${qteConfig.timeLimit}ms time limit`)
  }
  
  const resetQTE = () => {
    setActiveQTE(null)
    setQteState('idle')
    setProgress(0)
    setResult('')
    setKeyPresses([])
    pressCountRef.current = 0
    if (timerRef.current) clearTimeout(timerRef.current)
    if (simulateTimerRef.current) clearTimeout(simulateTimerRef.current)
    
    console.log('Reset QTE state')
  }
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (simulateTimerRef.current) clearTimeout(simulateTimerRef.current)
    }
  }, [])

  return (
    <section id="gameplay" className="mt-16 mb-16">
      <div className="mb-8">
        <h2 className="font-rajdhani text-3xl font-bold text-detroit-white mb-2">QUICK TIME EVENTS</h2>
        <p className="text-detroit-white/70">Experience the tension of time-critical decisions in Detroit: Become Human.</p>
      </div>
      
      <div className="interface-panel relative overflow-hidden">
        {/* QTE Selection */}
        {qteState === 'idle' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-detroit-white">Select a QTE scenario to experience:</p>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="simulate-mode" 
                  className="mr-2" 
                  checked={simulateMode}
                  onChange={() => setSimulateMode(!simulateMode)}
                />
                <label htmlFor="simulate-mode" className="text-detroit-white/70 text-sm cursor-pointer">
                  Auto-Simulate Keys
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {qteSamples.map((qte, index) => (
                <motion.div
                  key={index}
                  className="interface-border p-4 cursor-pointer hover:bg-detroit-blue/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => startQTE(qte)}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-rajdhani text-detroit-white">{qte.type.toUpperCase()} QTE</span>
                    <span className="android-terminal text-xs">{(qte.timeLimit / 1000).toFixed(1)}s</span>
                  </div>
                  <p className="text-sm text-detroit-white/80 mb-3">{qte.description}</p>
                  <div className="flex space-x-2">
                    {qte.keys.map((key, i) => (
                      <div 
                        key={i} 
                        className="w-8 h-8 flex items-center justify-center border border-detroit-blue/50 bg-detroit-blue/10 text-detroit-blue font-mono text-xs"
                      >
                        {key === 'ArrowUp' ? '↑' :
                         key === 'ArrowDown' ? '↓' :
                         key === 'ArrowLeft' ? '←' :
                         key === 'ArrowRight' ? '→' :
                         key === 'Space' ? '␣' : key}
                      </div>
                    ))}
                    {qte.type === 'sequence' && <div className="text-xs text-detroit-white/60 self-center">in sequence</div>}
                    {qte.type === 'mash' && <div className="text-xs text-detroit-white/60 self-center">repeatedly</div>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Active QTE */}
        {qteState === 'active' && activeQTE && (
          <div className="p-6 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-detroit-white/20">
              <motion.div 
                className="h-full bg-detroit-blue"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: activeQTE.timeLimit / 1000, ease: 'linear' }}
              />
            </div>
            
            <div className="mb-8 text-center">
              <p className="font-rajdhani text-xl text-detroit-white mb-4">{activeQTE.description}</p>
              
              <div className="flex justify-center space-x-4 my-8">
                {activeQTE.type === 'press' && (
                  <motion.div 
                    className="w-20 h-20 flex items-center justify-center border-2 border-detroit-blue bg-detroit-blue/10 text-detroit-blue font-mono text-xl cursor-pointer"
                    animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    onClick={() => !simulateMode && simulateKeyPress(activeQTE.keys[0])}
                  >
                    {activeQTE.keys[0] === 'Space' ? 'SPACE' : activeQTE.keys[0]}
                  </motion.div>
                )}
                
                {activeQTE.type === 'mash' && (
                  <motion.div 
                    className="w-20 h-20 flex items-center justify-center border-2 border-detroit-blue bg-detroit-blue/10 text-detroit-blue font-mono text-xl cursor-pointer"
                    animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                    onClick={() => !simulateMode && simulateKeyPress(activeQTE.keys[0])}
                  >
                    {activeQTE.keys[0]}
                  </motion.div>
                )}
                
                {activeQTE.type === 'sequence' && activeQTE.keys.map((key, i) => (
                  <div 
                    key={i} 
                    className={`w-12 h-12 flex items-center justify-center border-2 cursor-pointer ${i === keyPresses.length ? 'border-detroit-teal bg-detroit-teal/20 text-detroit-teal animate-pulse' : i < keyPresses.length ? 'border-detroit-teal/50 bg-detroit-teal/10 text-detroit-teal/50' : 'border-detroit-blue/50 bg-detroit-blue/10 text-detroit-blue/50'} font-mono text-lg`}
                    onClick={() => !simulateMode && i === keyPresses.length && simulateKeyPress(key)}
                  >
                    {key === 'ArrowUp' ? '↑' :
                     key === 'ArrowDown' ? '↓' :
                     key === 'ArrowLeft' ? '←' :
                     key === 'ArrowRight' ? '→' :
                     key === 'Space' ? '␣' : key}
                  </div>
                ))}
              </div>
              
              {activeQTE.type !== 'press' && (
                <div className="w-full h-2 bg-detroit-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-detroit-teal"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              
              {!simulateMode && (
                <p className="text-detroit-white/60 text-sm mt-4">
                  {activeQTE.type === 'press' ? 'Press the key or click the button above' : 
                   activeQTE.type === 'mash' ? 'Press the key repeatedly or click the button above' : 
                   'Press the keys in sequence or click the buttons above'}
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* QTE Result */}
        {(qteState === 'success' || qteState === 'failure') && (
          <div className="p-6 text-center">
            <h3 className={`font-rajdhani text-2xl font-bold ${qteState === 'success' ? 'text-detroit-teal' : 'text-detroit-red'} mb-4`}>
              {qteState === 'success' ? 'SUCCESS' : 'FAILURE'}
            </h3>
            
            <p className="text-detroit-white mb-8">{result}</p>
            
            <button 
              className="bg-detroit-blue/20 hover:bg-detroit-blue/30 text-detroit-blue font-rajdhani font-bold py-2 px-4 interface-border transition-colors"
              onClick={resetQTE}
            >
              TRY ANOTHER SCENARIO
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
