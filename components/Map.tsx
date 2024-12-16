'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { locations } from '@/data/locations'
import { Locate } from 'lucide-react'

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: 'weekly',
      })

      const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary
      const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary
      const { InfoWindow } = await loader.importLibrary('maps') as google.maps.MapsLibrary

      const mapInstance = new Map(mapRef.current as HTMLElement, {
        center: { lat: -23.442503, lng: -58.443832 }, // Centro de Paraguay
        zoom: 7,
        gestureHandling: 'greedy',
      })

      setMap(mapInstance)

      const bounds = new google.maps.LatLngBounds()
      const infoWindow = new InfoWindow()

      locations.forEach((location) => {
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
          infoWindow.setContent(`
            <div style="
              padding: 1rem;
              max-width: 300px;
              font-family: 'Inter', sans-serif;
              color: #1f2937;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1)
            ">
              <h2 style="
                font-size: 1.25rem;
                font-weight: 600;
                color: #2563eb;
                margin-bottom: 0.5rem;
              ">${location.name}</h2>
              <p style="
                font-size: 0.875rem;
                color: #4b5563;
                margin-bottom: 0.5rem;
              ">${location.address}</p>
              <p style="
                font-size: 0.875rem;
                color: #6b7280;
                margin-bottom: 1rem;
              ">${location.description}</p>
              <a href="${location.website}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                  display: inline-block;
                  padding: 0.5rem 1rem;
                  background: #2563eb;
                  color: white;
                  text-decoration: none;
                  border-radius: 4px;
                  font-size: 0.875rem;
                  transition: background 0.2s;
                "
                onmouseover="this.style.background='#1d4ed8'"
                onmouseout="this.style.background='#2563eb'"
              >
                Visitar sitio web
              </a>
            </div>
          `)
          infoWindow.open(mapInstance, marker)
        })
      })

      mapInstance.fitBounds(bounds)
      setIsLoading(false)
    }

    initMap()
  }, [])

  const handleLocateMe = () => {
    if (!map || !navigator.geolocation) return

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        map.panTo(userLocation)
        map.setZoom(15)
        setIsLoading(false)
      },
      (error) => {
        console.error('Error getting location:', error)
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  }

  return (
    <div className="relative w-full h-[400px]">
      {isLoading && (
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
    </div>
  )
}

