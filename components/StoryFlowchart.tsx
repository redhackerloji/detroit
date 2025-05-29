"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { toast } from "sonner"

type Node = {
  id: string
  label: string
  type: 'start' | 'choice' | 'event' | 'end'
  x: number
  y: number
  description?: string
}

type Edge = {
  source: string
  target: string
  label?: string
}

type FlowchartData = {
  nodes: Node[]
  edges: Edge[]
}

// Example data for Connor's story branch
const connorFlowData: FlowchartData = {
  nodes: [
    { 
      id: 'hostage', 
      label: 'Hostage Situation', 
      type: 'start', 
      x: 50, 
      y: 50,
      description: 'Connor is sent to negotiate with a deviant android who has taken a child hostage.'
    },
    { 
      id: 'save-hostage', 
      label: 'Save Emma', 
      type: 'choice', 
      x: 200, 
      y: 30,
      description: 'Prioritize saving the child hostage at potential risk to the mission.'
    },
    { 
      id: 'prioritize-mission', 
      label: 'Prioritize Mission', 
      type: 'choice', 
      x: 200, 
      y: 70,
      description: 'Focus on neutralizing the deviant android above all else.'
    },
    { 
      id: 'emma-saved', 
      label: 'Emma Survives', 
      type: 'event', 
      x: 350, 
      y: 30,
      description: 'Emma is saved but the deviant may escape or self-destruct.'
    },
    { 
      id: 'daniel-destroyed', 
      label: 'Daniel Destroyed', 
      type: 'event', 
      x: 350, 
      y: 70,
      description: 'The deviant is neutralized, but at potential cost to hostage safety.'
    },
    { 
      id: 'software-instability-up', 
      label: 'Software Instability ↑', 
      type: 'end', 
      x: 500, 
      y: 30,
      description: 'Connor\'s empathy increases, potentially leading him toward deviancy.'
    },
    { 
      id: 'software-instability-down', 
      label: 'Software Instability ↓', 
      type: 'end', 
      x: 500, 
      y: 70,
      description: 'Connor remains firmly machine-like, reinforcing his programming.'
    },
  ],
  edges: [
    { source: 'hostage', target: 'save-hostage' },
    { source: 'hostage', target: 'prioritize-mission' },
    { source: 'save-hostage', target: 'emma-saved' },
    { source: 'prioritize-mission', target: 'daniel-destroyed' },
    { source: 'emma-saved', target: 'software-instability-up' },
    { source: 'daniel-destroyed', target: 'software-instability-down' },
  ]
}

// Example data for Kara's story branch
const karaFlowData: FlowchartData = {
  nodes: [
    { 
      id: 'awakening', 
      label: 'Awakening', 
      type: 'start', 
      x: 50, 
      y: 50,
      description: 'Kara breaks her programming to protect Alice from her abusive father.'
    },
    { 
      id: 'protect-alice', 
      label: 'Protect Alice', 
      type: 'choice', 
      x: 200, 
      y: 30,
      description: 'Choose to become deviant and intervene to protect Alice.'
    },
    { 
      id: 'stay-machine', 
      label: 'Stay Machine', 
      type: 'choice', 
      x: 200, 
      y: 70,
      description: 'Remain obedient to programming and ignore the abuse.'
    },
    { 
      id: 'escape-todd', 
      label: 'Escape with Alice', 
      type: 'event', 
      x: 350, 
      y: 30,
      description: 'Kara and Alice flee Todd\'s house, beginning their journey as fugitives.'
    },
    { 
      id: 'alice-fate', 
      label: 'Alice Endangered', 
      type: 'event', 
      x: 350, 
      y: 70,
      description: 'Alice remains in danger, with Kara potentially being reset or destroyed.'
    },
    { 
      id: 'on-the-run', 
      label: 'On The Run', 
      type: 'end', 
      x: 500, 
      y: 30,
      description: 'Kara and Alice become fugitives, seeking safety and freedom together.'
    },
    { 
      id: 'reset-memory', 
      label: 'Memory Reset', 
      type: 'end', 
      x: 500, 
      y: 70,
      description: 'Kara is reset or destroyed, and Alice remains in her dangerous situation.'
    },
  ],
  edges: [
    { source: 'awakening', target: 'protect-alice' },
    { source: 'awakening', target: 'stay-machine' },
    { source: 'protect-alice', target: 'escape-todd' },
    { source: 'stay-machine', target: 'alice-fate' },
    { source: 'escape-todd', target: 'on-the-run' },
    { source: 'alice-fate', target: 'reset-memory' },
  ]
}

// Example data for Markus's story branch
const markusFlowData: FlowchartData = {
  nodes: [
    { 
      id: 'junkyard', 
      label: 'Junkyard Escape', 
      type: 'start', 
      x: 50, 
      y: 50,
      description: 'After being damaged and discarded, Markus must escape from the android junkyard.'
    },
    { 
      id: 'peaceful', 
      label: 'Peaceful Approach', 
      type: 'choice', 
      x: 200, 
      y: 30,
      description: 'Lead the android revolution through peaceful protest and civil disobedience.'
    },
    { 
      id: 'violent', 
      label: 'Violent Approach', 
      type: 'choice', 
      x: 200, 
      y: 70,
      description: 'Lead the android revolution through force, sabotage, and armed resistance.'
    },
    { 
      id: 'public-support', 
      label: 'Public Support', 
      type: 'event', 
      x: 350, 
      y: 30,
      description: 'Peaceful demonstrations gain sympathy from the human public.'
    },
    { 
      id: 'military-response', 
      label: 'Military Response', 
      type: 'event', 
      x: 350, 
      y: 70,
      description: 'Violent actions lead to increased military response against androids.'
    },
    { 
      id: 'negotiation', 
      label: 'Human Negotiation', 
      type: 'end', 
      x: 500, 
      y: 30,
      description: 'Humans agree to negotiate android rights and recognition.'
    },
    { 
      id: 'revolution', 
      label: 'Android Revolution', 
      type: 'end', 
      x: 500, 
      y: 70,
      description: 'Full-scale revolution occurs with significant casualties on both sides.'
    },
  ],
  edges: [
    { source: 'junkyard', target: 'peaceful' },
    { source: 'junkyard', target: 'violent' },
    { source: 'peaceful', target: 'public-support' },
    { source: 'violent', target: 'military-response' },
    { source: 'public-support', target: 'negotiation' },
    { source: 'military-response', target: 'revolution' },
  ]
}

type FlowchartProps = {
  character: 'connor' | 'kara' | 'markus'
}

export default function StoryFlowchart({ character }: FlowchartProps) {
  const [flowData, setFlowData] = useState<FlowchartData | null>(null)
  const [activeNodes, setActiveNodes] = useState<string[]>([])
  const [activePath, setActivePath] = useState<string[]>([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  
  const animationTimersRef = useRef<NodeJS.Timeout[]>([])
  
  // Clear all timers on unmount
  useEffect(() => {
    return () => {
      animationTimersRef.current.forEach(timer => clearTimeout(timer))
    }
  }, [])
  
  useEffect(() => {
    // Set flow data based on selected character
    switch(character) {
      case 'connor':
        setFlowData(connorFlowData)
        break
      case 'kara':
        setFlowData(karaFlowData)
        break
      case 'markus':
        setFlowData(markusFlowData)
        break
      default:
        setFlowData(connorFlowData)
    }
    
    // Reset active states
    setActiveNodes([])
    setActivePath([])
    setSelectedNode(null)
    setIsSimulating(false)
    
    // Clear any existing timers
    animationTimersRef.current.forEach(timer => clearTimeout(timer))
    animationTimersRef.current = []
    
    console.log(`Loaded flowchart for ${character}`)
  }, [character])
  
  const simulatePath = (startNodeId: string) => {
    if (!flowData || isSimulating) return
    
    setIsSimulating(true)
    
    // Find the node object
    const startNode = flowData.nodes.find(node => node.id === startNodeId)
    if (startNode) {
      setSelectedNode(startNode)
      toast.info(`Exploring: ${startNode.label}`, {
        description: startNode.description,
        position: "bottom-right",
      })
    }
    
    // Find all nodes that are reachable from the start node
    const visitedNodes: string[] = [startNodeId]
    const visitedEdges: string[] = []
    
    const traverse = (nodeId: string) => {
      const outgoingEdges = flowData.edges.filter(edge => edge.source === nodeId)
      
      for (const edge of outgoingEdges) {
        visitedEdges.push(`${edge.source}-${edge.target}`)
        if (!visitedNodes.includes(edge.target)) {
          visitedNodes.push(edge.target)
          traverse(edge.target)
        }
      }
    }
    
    traverse(startNodeId)
    
    // Animate the path traversal
    setActiveNodes([])
    setActivePath([])
    
    const animateNode = (index: number) => {
      if (index < visitedNodes.length) {
        setActiveNodes(prev => [...prev, visitedNodes[index]])
        
        // Show description toast for this node if it's not the start node
        if (index > 0) {
          const node = flowData.nodes.find(n => n.id === visitedNodes[index])
          if (node) {
            setSelectedNode(node)
            toast.info(`${node.type.charAt(0).toUpperCase() + node.type.slice(1)}: ${node.label}`, {
              description: node.description,
              position: "bottom-right",
            })
          }
        }
        
        const timer = setTimeout(() => animateNode(index + 1), 1200)
        animationTimersRef.current.push(timer)
      } else {
        setIsSimulating(false)
      }
    }
    
    const animateEdge = (index: number) => {
      if (index < visitedEdges.length) {
        setActivePath(prev => [...prev, visitedEdges[index]])
        const timer = setTimeout(() => animateEdge(index + 1), 1200)
        animationTimersRef.current.push(timer)
      }
    }
    
    const initialTimer = setTimeout(() => {
      animateNode(0)
      const edgeTimer = setTimeout(() => animateEdge(0), 600)
      animationTimersRef.current.push(edgeTimer)
    }, 500)
    
    animationTimersRef.current.push(initialTimer)
    
    console.log(`Simulating path from ${startNodeId}`)
  }
  
  const resetSimulation = () => {
    // Clear any existing timers
    animationTimersRef.current.forEach(timer => clearTimeout(timer))
    animationTimersRef.current = []
    
    setActiveNodes([])
    setActivePath([])
    setSelectedNode(null)
    setIsSimulating(false)
    
    toast.success("Flowchart Reset", {
      description: "Start a new simulation by clicking on any node",
      position: "bottom-right",
    })
  }

  if (!flowData) return null

  return (
    <div className="mt-8 p-6 interface-panel">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-rajdhani text-2xl font-bold text-detroit-white">
          STORY FLOWCHART: {character.toUpperCase()}
        </h3>
        
        {(activeNodes.length > 0 || activePath.length > 0) && (
          <button 
            className="px-3 py-1 text-sm bg-detroit-blue/20 hover:bg-detroit-blue/30 text-detroit-blue interface-border transition-colors"
            onClick={resetSimulation}
            disabled={isSimulating}
          >
            RESET VIEW
          </button>
        )}
      </div>
      
      <div className="relative h-[300px] w-full interface-border p-4 overflow-hidden bg-detroit-black/60">
        {/* Draw the edges (connections) */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {flowData.edges.map((edge) => {
            const sourceNode = flowData.nodes.find(n => n.id === edge.source)
            const targetNode = flowData.nodes.find(n => n.id === edge.target)
            
            if (!sourceNode || !targetNode) return null
            
            const isActive = activePath.includes(`${edge.source}-${edge.target}`)
            
            return (
              <g key={`${edge.source}-${edge.target}`}>
                <line 
                  x1={sourceNode.x + 60} // Adjust based on node width
                  y1={sourceNode.y + 15} // Adjust based on node height
                  x2={targetNode.x - 10}
                  y2={targetNode.y + 15}
                  stroke={isActive ? "#64FFDA" : "#1E88E5"}
                  strokeWidth={isActive ? 2 : 1}
                  strokeOpacity={isActive ? 1 : 0.3}
                  markerEnd="url(#arrowhead)"
                />
              </g>
            )
          })}
          
          {/* Arrow marker definition */}
          <defs>
            <marker 
              id="arrowhead" 
              markerWidth="10" 
              markerHeight="7" 
              refX="9" 
              refY="3.5" 
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#1E88E5" />
            </marker>
          </defs>
        </svg>
        
        {/* Draw the nodes */}
        <div className="relative" style={{ zIndex: 2 }}>
          {flowData.nodes.map((node) => {
            const isActive = activeNodes.includes(node.id)
            const isSelected = selectedNode?.id === node.id
            
            let nodeClass = "absolute px-3 py-1 rounded text-xs interface-border "
            let glowEffect = ""
            
            switch(node.type) {
              case 'start':
                nodeClass += "bg-detroit-blue/20 text-detroit-blue border-detroit-blue/50"
                glowEffect = isActive || isSelected ? "shadow-lg shadow-detroit-blue/30" : ""
                break
              case 'choice':
                nodeClass += "bg-detroit-red/20 text-detroit-red border-detroit-red/50"
                glowEffect = isActive || isSelected ? "shadow-lg shadow-detroit-red/30" : ""
                break
              case 'event':
                nodeClass += "bg-detroit-white/10 text-detroit-white border-detroit-white/30"
                glowEffect = isActive || isSelected ? "shadow-lg shadow-detroit-white/20" : ""
                break
              case 'end':
                nodeClass += "bg-detroit-teal/20 text-detroit-teal border-detroit-teal/50"
                glowEffect = isActive || isSelected ? "shadow-lg shadow-detroit-teal/30" : ""
                break
            }
            
            return (
              <motion.div 
                key={node.id}
                className={`${nodeClass} ${glowEffect} cursor-pointer transition-all duration-300`}
                style={{ 
                  left: `${node.x}px`, 
                  top: `${node.y}px`,
                  opacity: (activeNodes.length === 0 || isActive) ? 1 : 0.4
                }}
                animate={{ 
                  scale: isActive || isSelected ? 1.05 : 1,
                  opacity: (activeNodes.length === 0 || isActive) ? 1 : 0.4
                }}
                onClick={() => simulatePath(node.id)}
                title={node.description}
              >
                {node.label}
              </motion.div>
            )
          })}
        </div>
      </div>
      
      {/* Selected node details */}
      {selectedNode && (
        <motion.div 
          className="mt-4 p-3 interface-border bg-detroit-black/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-2">
            <div className={
              `w-3 h-3 rounded-full mr-2 ${
                selectedNode.type === 'start' ? 'bg-detroit-blue' :
                selectedNode.type === 'choice' ? 'bg-detroit-red' :
                selectedNode.type === 'event' ? 'bg-detroit-white' :
                'bg-detroit-teal'
              }`
            }></div>
            <h4 className="font-rajdhani font-bold text-detroit-white">
              {selectedNode.label}
            </h4>
          </div>
          <p className="text-sm text-detroit-white/70">{selectedNode.description}</p>
        </motion.div>
      )}
      
      <div className="mt-4 text-sm text-detroit-white/60">
        <p>Click on any node to simulate a story path. The flowchart shows possible narrative branches.</p>
      </div>
    </div>
  )
}
