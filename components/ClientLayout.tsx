"use client"

import { Toaster } from "sonner"
import PresentationWrapper from './PresentationWrapper'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <PresentationWrapper>
        {children}
      </PresentationWrapper>
      <Toaster position="bottom-right" theme="dark" toastOptions={{
        style: {
          background: 'rgba(18, 18, 18, 0.95)',
          border: '1px solid rgba(30, 136, 229, 0.3)',
          color: '#E0E0E0',
          fontFamily: 'var(--font-rajdhani)',
        },
      }} />
    </>
  )
} 