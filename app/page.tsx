import Map from '@/components/Map'
import LocationList from '@/components/LocationList'
import Search from '@/components/Search'
import DarkModeToggle from '@/components/DarkModeToggle'
import { Wheat } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex justify-between items-center py-4 px-6 bg-blue-600 dark:bg-blue-800 text-white">
        <h1 className="text-2xl font-bold flex items-center">
          <Wheat className="mr-2" />
          Paraguay Sin Gluten
        </h1>
        <DarkModeToggle />
      </header>
      <div className="flex-1 overflow-hidden">
        <Map />
      </div>
      <div className="p-4 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl font-semibold mb-4">Lugares Sin Gluten en Paraguay</h2>
        <Search />
        <LocationList />
      </div>
      <footer className="bg-blue-600 dark:bg-blue-800 text-white py-4 text-center">
        <p>&copy; 2023 Paraguay Sin Gluten. Todos los derechos reservados.</p>
      </footer>
    </main>
  )
}

