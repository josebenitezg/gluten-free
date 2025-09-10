import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LocationsProvider } from '@/providers/LocationsProvider'
import AppHeader from '@/components/AppHeader'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Paraguay Sin Gluten',
  description: 'Encuentra restaurantes y cafés sin gluten en Paraguay',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" 
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00F879" />
        <meta name="msapplication-TileColor" content="#00F879" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body suppressHydrationWarning className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocationsProvider>
            <div className="flex min-h-dvh flex-col">
              <AppHeader />
              <main className="flex-1 min-h-0">
                {children}
              </main>
            </div>
          </LocationsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

