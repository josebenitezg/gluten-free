
'use client'

import Map from '@/components/Map'
import LocationList from '@/components/LocationList'
import Search from '@/components/Search'
import DisclaimerModal from '@/components/DisclaimerModal'
import { useState, useEffect } from 'react'
import { FormattedLocation } from '@/data/locations'
import { useLocations } from '@/providers/LocationsProvider'
import DonateButton from '@/components/DonateButton'
import { haversineDistanceKm } from '@/lib/utils'

export default function Home() {
  const { locations } = useLocations()
  const [filteredLocations, setFilteredLocations] = useState<FormattedLocation[]>([])
  const [onlyGlutenFree, setOnlyGlutenFree] = useState(false)
  const [onlyOptions, setOnlyOptions] = useState(false)
  const [serviceFilters, setServiceFilters] = useState<{ delivery: boolean; pick_up: boolean; en_lugar: boolean }>({ delivery: false, pick_up: false, en_lugar: false })
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null)

  // Actualizar filteredLocations cuando locations se cargue
  useEffect(() => {
    setFilteredLocations(locations)
  }, [locations])

  const applyFilters = (source: FormattedLocation[]) => {
    let list = [...source]
    if (onlyGlutenFree) list = list.filter(l => l.isGlutenFree)
    if (onlyOptions) list = list.filter(l => !l.isGlutenFree)
    const activeServices = Object.entries(serviceFilters).filter(([_, v]) => v).map(([k]) => k)
    if (activeServices.length) {
      list = list.filter(l => l.services.some(s => activeServices.includes(s.type)))
    }
    if (userPosition) {
      list = list
        .map(l => ({ ...l, _distanceKm: haversineDistanceKm(userPosition, { lat: l.lat, lng: l.lng }) }))
        .sort((a: any, b: any) => a._distanceKm - b._distanceKm)
        .map(({ _distanceKm, ...rest }) => rest as FormattedLocation)
    }
    setFilteredLocations(list)
  }

  const handleSearch = (results: FormattedLocation[]) => {
    applyFilters(results)
  }

  const requestNearMe = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        setUserPosition(coords)
        applyFilters(locations)
      },
      () => {
        setUserPosition(null)
        applyFilters(locations)
      },
      { enableHighAccuracy: true, timeout: 5000 }
    )
  }

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-black dark:to-black">
      <DisclaimerModal />
      {/* Header global se renderiza en layout */}
      <section className="flex-1 grid grid-rows-[auto_1fr] md:grid-cols-2 md:grid-rows-1 gap-4 p-4">
        <div className="order-2 md:order-1">
          <div className="glass-card mb-3 p-3 flex flex-wrap items-center gap-2">
            <button
              className={`px-3 py-1 rounded-full text-sm border ${onlyGlutenFree ? 'bg-green-600 text-white border-green-500' : 'bg-transparent text-foreground border-border'}`}
              onClick={() => { setOnlyGlutenFree(v => !v); applyFilters(locations) }}
              aria-pressed={onlyGlutenFree}
            >100% SG</button>
            <button
              className={`px-3 py-1 rounded-full text-sm border ${onlyOptions ? 'bg-amber-500 text-black border-amber-400' : 'bg-transparent text-foreground border-border'}`}
              onClick={() => { setOnlyOptions(v => !v); applyFilters(locations) }}
              aria-pressed={onlyOptions}
            >Opciones</button>
            {(['delivery','pick_up','en_lugar'] as const).map(key => (
              <button
                key={key}
                className={`px-3 py-1 rounded-full text-sm border ${serviceFilters[key] ? 'bg-white/10 border-white/20' : 'bg-transparent text-foreground border-border'}`}
                onClick={() => { setServiceFilters(s => ({ ...s, [key]: !s[key] })); applyFilters(locations) }}
                aria-pressed={serviceFilters[key]}
              >{key === 'delivery' ? 'Delivery' : key === 'pick_up' ? 'Pick up' : 'En lugar'}</button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <button
                className="px-3 py-1 rounded-full text-sm border bg-[#00F879] text-black hover:bg-[#00F879]/90"
                onClick={requestNearMe}
              >Cerca de mí</button>
            </div>
          </div>
          <div className="glass-card p-4 h-[calc(100vh-320px)] md:h-[calc(100vh-140px)] overflow-auto">
            <h2 className="text-xl font-semibold mb-3 text-[#00F879]">Lugares</h2>
            <Search onSearch={handleSearch} />
            <LocationList locations={filteredLocations} userPosition={userPosition} />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <Map locationsOverride={filteredLocations} height={500} />
        </div>
      </section>
      <footer className="glass-navbar py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2025 Paraguay Sin Gluten.</p>
      </footer>
      <DonateButton />
    </main>
  )
}

