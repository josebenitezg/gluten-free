'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { Locate } from 'lucide-react'
import { useLocations } from '@/providers/LocationsProvider'

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null)
  const { locations, isLoading: isLoadingLocations } = useLocations()
  const [isLoadingMap, setIsLoadingMap] = useState(true)
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
          const socialLinks = [];
          
          if (location.whatsapp) {
            socialLinks.push(`
              <a href="https://wa.me/${location.whatsapp}" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style="
                   display: inline-flex;
                   align-items: center;
                   margin-right: 8px;
                   color: #25D366;
                   text-decoration: none;
                   font-size: 0.875rem;
                 "
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 4px;">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                WhatsApp
              </a>
            `);
          }
          
          if (location.social.instagram) {
            socialLinks.push(`
              <a href="https://instagram.com/${location.social.instagram}" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style="
                   display: inline-flex;
                   align-items: center;
                   margin-right: 8px;
                   color: #E1306C;
                   text-decoration: none;
                   font-size: 0.875rem;
                 "
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 4px;">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
                Instagram
              </a>
            `);
          }
          
          if (location.social.facebook) {
            socialLinks.push(`
              <a href="${location.social.facebook}" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style="
                   display: inline-flex;
                   align-items: center;
                   margin-right: 8px;
                   color: #1877F2;
                   text-decoration: none;
                   font-size: 0.875rem;
                 "
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 4px;">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                </svg>
                Facebook
              </a>
            `);
          }

          // Add Google Maps link to the social links
          socialLinks.push(`
            <a href="${location.googleMapsUrl}" 
               target="_blank" 
               rel="noopener noreferrer"
               style="
                 display: inline-flex;
                 align-items: center;
                 color: #EA4335;
                 text-decoration: none;
                 font-size: 0.875rem;
               "
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 4px;">
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
              </svg>
              Maps
            </a>
          `);

          const glutenFreeStatus = location.isGlutenFree 
            ? '<span style="background-color: #10B981; color: white; font-size: 0.75rem; padding: 2px 8px; border-radius: 9999px; display: inline-block; margin-top: 8px;">100% Sin Gluten</span>'
            : '<span style="background-color: #F59E0B; color: white; font-size: 0.75rem; padding: 2px 8px; border-radius: 9999px; display: inline-block; margin-top: 8px;">Opciones Sin Gluten</span>';

          infoWindow.setContent(`
            <div style="
              padding: 1rem;
              max-width: 300px;
              font-family: 'Inter', sans-serif;
              color: #1f2937;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            ">
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 0.5rem;
              ">
                <h2 style="
                  font-size: 1.25rem;
                  font-weight: 600;
                  color: #2563eb;
                  margin: 0;
                ">${location.name}</h2>
                ${glutenFreeStatus}
              </div>
              
              <p style="
                font-size: 0.875rem;
                color: #4b5563;
                margin-bottom: 0.75rem;
              ">${location.address}</p>
              
              <p style="
                font-size: 0.875rem;
                color: #6b7280;
                margin-bottom: 0.75rem;
                font-style: italic;
              ">${location.category}</p>
              
              ${socialLinks.length > 0 ? 
                `<div style="
                  display: flex;
                  flex-wrap: wrap;
                  margin-bottom: 0;
                ">
                  ${socialLinks.join('')}
                </div>` 
                : ''
              }
            </div>
          `);
          infoWindow.open(mapInstance, marker);
        });
      })

      mapInstance.fitBounds(bounds)
      setIsLoadingMap(false)
    }

    initMap()
  }, [locations])

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
    <div className="relative w-full h-[400px]">
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
    </div>
  )
}

