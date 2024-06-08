import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './nestable.css'
import { EditorContextProvider } from '@/app/contexts/editor-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'noteapp',
  description: 'A simple client-side note app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background-dark">
      <body className={`${inter.className} bg-background-dark`}>
        <EditorContextProvider>{children}</EditorContextProvider>
      </body>
    </html>
  )
}
