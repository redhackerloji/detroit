"use client"

import Hero from '@/components/Hero'
import CharacterSelector from '@/components/CharacterSelector'
import NavSidebar from '@/components/NavSidebar'
import GameplaySection from '@/components/GameplaySection'
import ThemesSection from '@/components/ThemesSection'
import AboutSection from '@/components/AboutSection'
import CharacterGrid from '@/components/CharacterGrid'
import VideoSection from '@/components/VideoSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-detroit-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/detroit-bg.png')] bg-cover bg-center opacity-20 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-detroit-blue/5 to-detroit-black z-0"></div>

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col lg:flex-row w-full min-h-screen">
        {/* Navigation sidebar */}
        <NavSidebar />
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col p-4 lg:p-8 overflow-y-auto">
          <Hero />
          <CharacterSelector />
          <GameplaySection />
          <ThemesSection />
          <AboutSection />
          <VideoSection />
          <CharacterGrid />
          
          <footer className="mt-16 pt-8 border-t border-detroit-blue/30 text-center text-detroit-white/50 text-sm">
            <p>Detroit: Become Human Interactive Presentation - Created for educational purposes</p>
            <p className="mt-2">Detroit: Become Human is a property of Quantic Dream and Sony Interactive Entertainment</p>
            <p className="mt-2">© {new Date().getFullYear()} - Interactive Web Presentation</p>
          </footer>
        </div>
      </div>
    </main>
  )
}
