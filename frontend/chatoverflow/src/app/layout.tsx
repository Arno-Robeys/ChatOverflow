'use client'
import Navbar from './component/Navbar'
import './globals.css'



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body>
        <Navbar />
        {children}</body>
    </html>
  )
}
