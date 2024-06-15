import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Currency Converter',
  description:
    'Convert world currencies using the Euro foreign exchange reference rates, the base currency used - EUR',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-screen-md mx-auto mt-12">{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
