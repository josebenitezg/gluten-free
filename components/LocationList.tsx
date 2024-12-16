'use client'

import { useState } from 'react'
import { locations } from '@/data/locations'
import { motion } from 'framer-motion'
import { MapPin, Globe, ExternalLink } from 'lucide-react'

export default function LocationList() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

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
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">{location.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 flex items-center mt-2">
              <MapPin size={16} className="mr-2" />
              {location.address}
            </p>
          </button>
          {expandedId === location.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-blue-100 dark:bg-blue-900"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-4">{location.description}</p>
              <a
                href={location.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-2"
              >
                <Globe size={16} className="mr-2" />
                Visitar sitio web
              </a>
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ExternalLink size={16} className="mr-2" />
                Ver en Google Maps
              </a>
            </motion.div>
          )}
        </motion.li>
      ))}
    </ul>
  )
}

