'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import LocationTable from './LocationTable'
import LocationForm from './LocationForm'
import { FormattedLocation } from '@/data/locations'
import { useLocations } from '@/providers/LocationsProvider'

export default function AdminDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingLocation, setEditingLocation] = useState<FormattedLocation | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const { locations } = useLocations()

  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Locales 🇵🇾
        </h1>
        <button
          onClick={() => {
            setEditingLocation(null)
            setIsFormOpen(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#00F879] text-gray-900 rounded-lg hover:bg-[#00F879]/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Agregar Local
        </button>
      </div>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Buscar locales..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
      </div>

      <LocationTable
        locations={filteredLocations}
        onEdit={(location) => {
          setEditingLocation(location)
          setIsFormOpen(true)
        }}
      />

      {isFormOpen && (
        <LocationForm
          location={editingLocation}
          onClose={() => {
            setIsFormOpen(false)
            setEditingLocation(null)
          }}
        />
      )}
    </div>
  )
} 