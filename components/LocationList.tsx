'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ShoppingBag, Home, Truck } from 'lucide-react'
import { useLocations } from '@/providers/LocationsProvider'
import { WhatsAppIcon, InstagramIcon, TwitterXIcon, FacebookIcon } from './icons/social-icons'

export default function LocationList() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { locations, isLoading, error } = useLocations()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00F879]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error al cargar las ubicaciones
      </div>
    )
  }

  const ServiceIcon = ({ service }: { service: string }) => {
    switch (service) {
      case 'delivery':
        return <Truck size={16} className="mr-2" />
      case 'pick_up':
        return <ShoppingBag size={16} className="mr-2" />
      case 'en_lugar':
        return <Home size={16} className="mr-2" />
      default:
        return null
    }
  }

  return (
    <ul className="space-y-4 mt-4">
      {locations.map((location) => (
        <motion.li
          key={location.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="w-full text-left p-4"
            onClick={() => setExpandedId(expandedId === location.id ? null : location.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{location.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 flex items-center mt-2">
                  <MapPin size={16} className="mr-2" />
                  {location.address}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                location.isGlutenFree ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
              }`}>
                {location.isGlutenFree ? '100% Sin Gluten' : 'Opciones Sin Gluten'}
              </span>
            </div>
          </button>
          {expandedId === location.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-blue-50 dark:bg-gray-700/50"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-4">{location.category}</p>
              
              {/* Services */}
              <div className="flex flex-wrap gap-2 mb-4">
                {location.services.map((service, index) => (
                  <span
                    key={index}
                    className="flex items-center px-3 py-1 bg-white dark:bg-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300"
                  >
                    <ServiceIcon service={service.type} />
                    {service.label}
                  </span>
                ))}
              </div>

              {/* Social Media & Contact */}
              <div className="flex flex-wrap gap-3">
                {location.whatsapp && (
                  <a
                    href={`https://wa.me/${location.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    <WhatsAppIcon className="mr-2" />
                    WhatsApp
                  </a>
                )}
                {location.social.instagram && (
                  <a
                    href={`https://instagram.com/${location.social.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
                  >
                    <InstagramIcon className="mr-2" />
                    Instagram
                  </a>
                )}
                {location.social.facebook && (
                  <a
                    href={location.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <FacebookIcon className="mr-2" />
                    Facebook
                  </a>
                )}
                {location.social.twitter && (
                  <a
                    href={`https://twitter.com/${location.social.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <TwitterXIcon className="mr-2" />
                    Twitter
                  </a>
                )}
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <MapPin size={16} className="mr-2" />
                  Ver en Maps
                </a>
              </div>
            </motion.div>
          )}
        </motion.li>
      ))}
    </ul>
  )
}
