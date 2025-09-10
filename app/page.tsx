
'use client'

import Map from '@/components/Map'
import LocationList from '@/components/LocationList'
import Search from '@/components/Search'
import DisclaimerModal from '@/components/DisclaimerModal'
import { useState, useEffect } from 'react'
import { FormattedLocation } from '@/data/locations'
import { useLocations } from '@/providers/LocationsProvider'
import DonateButton from '@/components/DonateButton'

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
      {/* Header global se renderiza en layout */}
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
      <DonateButton />
    </main>
  )
}

