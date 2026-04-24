import type { Metadata } from 'next'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/sora/400.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Methna | Premium Muslim Matchmaking',
  description:
    'Methna is a premium Muslim matchmaking app for serious relationships, privacy, verification, and respectful connection.',
  icons: {
    icon: '/assets/methna-mark.png',
    shortcut: '/assets/methna-mark.png',
    apple: '/assets/methna-mark.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#f7f1eb] font-dm-sans text-[#24180f] antialiased">
        {children}
      </body>
    </html>
  )
}
