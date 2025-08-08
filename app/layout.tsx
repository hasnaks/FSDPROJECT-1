import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Time Travel Machine',
  description: 'A time travel machine application',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Cascadia Code', 'Source Code Pro', 'Menlo', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace;
  --font-sans: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Cascadia Code', 'Source Code Pro', 'Menlo', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Cascadia Code', 'Source Code Pro', 'Menlo', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', monospace;
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
