'use client'

import { useState } from 'react'
import { locations, Location } from '@/data/locations'

interface SearchProps {
  onSearch?: (results: Location[]) => void;
}

export default function Search({ onSearch }: SearchProps = {}) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    // Filter locations based on search term
    const results = locations.filter(location => 
      location.name.toLowerCase().includes(value.toLowerCase()) ||
      location.address.toLowerCase().includes(value.toLowerCase()) ||
      location.description.toLowerCase().includes(value.toLowerCase())
    )

    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(results)
    }
  }

  return (
    <div className="relative mb-6">
      <input
        type="text"
        placeholder="Buscar lugares sin gluten..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 pl-8 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <svg
        className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

