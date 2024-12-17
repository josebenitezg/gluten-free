import Map from '@/components/Map'
import LocationList from '@/components/LocationList'
import Search from '@/components/Search'
import DarkModeToggle from '@/components/DarkModeToggle'
import { WheatOff, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <header className="glass-navbar py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center text-blue-600 dark:text-blue-400">
            <WheatOff className="mr-2" />
            Paraguay Sin Gluten
          </h1>
          <div className="flex items-center gap-4">
            <Link 
              href="/chat"
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm md:text-base"
            >
              <MessageCircle size={16} className="md:w-5 md:h-5" />
              Ask Celia
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <Map />
      </div>
      <div className="glass-card m-4 p-6 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
          Lugares Sin Gluten en Paraguay
        </h2>
        <Search />
        <LocationList />
      </div>
      <footer className="glass-navbar py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2024 Paraguay Sin Gluten. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}

