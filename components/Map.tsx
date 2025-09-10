'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { Locate } from 'lucide-react'
import { useLocations } from '@/providers/LocationsProvider'
import { FormattedLocation } from '@/data/locations'
import { cn } from '@/lib/utils'
import LocationDialog from '@/components/LocationDialog'

interface MapProps {
  locationsOverride?: FormattedLocation[]
  className?: string
  height?: number | string
}

export default function Map({ locationsOverride, className, height = 400 }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const { locations, isLoading: isLoadingLocations } = useLocations()
  const [isLoadingMap, setIsLoadingMap] = useState(true)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [selected, setSelected] = useState<FormattedLocation | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: 'weekly',
      })

      const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary
      const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary

      const mapInstance = new Map(mapRef.current as HTMLElement, {
        center: { lat: -23.442503, lng: -58.443832 }, // Centro de Paraguay
        zoom: 7,
        gestureHandling: 'greedy',
      })

      setMap(mapInstance)

      const bounds = new google.maps.LatLngBounds()

      const source = locationsOverride ?? locations
      source.forEach((location) => {
        const position = { lat: location.lat, lng: location.lng }
        const marker = new Marker({
          position: position,
          map: mapInstance,
          title: location.name,
          icon: {
            url: '/gluten-free-icon.svg',
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 40),
          },
        })

        bounds.extend(position)

        marker.addListener('click', () => {
          setSelected(location)
          setIsDialogOpen(true)
        })
      })

      mapInstance.fitBounds(bounds)
      setIsLoadingMap(false)
    }

    initMap()
  }, [locations, locationsOverride])

  const handleLocateMe = () => {
    if (!map || !navigator.geolocation) return

    setIsLoadingMap(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        map.panTo(userLocation)
        map.setZoom(15)
        setIsLoadingMap(false)
      },
      (error) => {
        console.error('Error getting location:', error)
        setIsLoadingMap(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  }

  return (
    <div className={cn('relative w-full', className)} style={{ height: typeof height === 'number' ? `${height}px` : height }}>
      {(isLoadingLocations || isLoadingMap) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
      <button
        onClick={handleLocateMe}
        className="absolute bottom-4 left-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Encontrar mi ubicación"
      >
        <Locate className="w-6 h-6 text-blue-600 dark:text-blue-400" />
      </button>
      <div ref={mapRef} className="w-full h-full" />
      <LocationDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} location={selected} />
    </div>
  )
}

