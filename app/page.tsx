'use client'

import Map from '@/components/Map'
import LocationList from '@/components/LocationList'
import Search from '@/components/Search'
import DarkModeToggle from '@/components/DarkModeToggle'
import DisclaimerModal from '@/components/DisclaimerModal'
import { WheatOff, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FormattedLocation } from '@/data/locations'
import { useLocations } from '@/providers/LocationsProvider'

export default function Home() {
  const { locations } = useLocations()
  const [filteredLocations, setFilteredLocations] = useState<FormattedLocation[]>([])

  // Actualizar filteredLocations cuando locations se cargue
  useEffect(() => {
    setFilteredLocations(locations)
  }, [locations])

  const handleSearch = (results: FormattedLocation[]) => {
    setFilteredLocations(results)
  }

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <DisclaimerModal />
      <header className="glass-navbar py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center text-[#00F879] dark:text-[#00F879]">
            <WheatOff className="mr-2" />
            Paraguay Sin Gluten
          </h1>
          <div className="flex items-center gap-4">
            <Link 
              href="/chat"
              className="flex items-center gap-1 md:gap-2 px-6 md:px-8 py-1.5 md:py-2 rounded-full bg-[#00F879] text-gray-900 hover:bg-[#00F879]/90 transition-colors text-sm md:text-base min-w-[120px] justify-center"
            >
              <MessageCircle size={16} className="md:w-5 md:h-5" />
              Celia
            </Link>
            <DarkModeToggle />
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <Map />
      </div>
      <div className="glass-card m-4 p-6 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-semibold mb-4 text-[#00F879] dark:text-[#00F879]">
          Lugares Sin Gluten en Paraguay
        </h2>
        <Search onSearch={handleSearch} />
        <LocationList locations={filteredLocations} />
      </div>
      <footer className="glass-navbar py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 Paraguay Sin Gluten.</p>
      </footer>
    </main>
  )
}

