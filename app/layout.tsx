import "./globals.css"
import { Rajdhani } from 'next/font/google'
import type { Metadata } from 'next'
import ClientLayout from '../components/ClientLayout'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'Detroit: Become Human - Interactive Demo',
  description: 'An interactive demo showcasing UI elements from Detroit: Become Human',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rajdhani.variable}>
      <body className="font-sans bg-detroit-black min-h-screen">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}