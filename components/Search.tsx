'use client'

import { useState } from 'react'
import { locations } from '@/data/locations'

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    // In a real app, you would filter the locations based on the search term
    // and update the state of the parent component
  }

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar lugares..."
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

