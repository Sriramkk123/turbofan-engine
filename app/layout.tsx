import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Turbofan Engine',
  description: 'A 3D model of a turbofan engine',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
