import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LocationsProvider } from '@/providers/LocationsProvider'

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
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocationsProvider>
            {children}
          </LocationsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

