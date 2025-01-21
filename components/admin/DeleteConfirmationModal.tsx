'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { FormattedLocation } from '@/data/locations'
import { supabase } from '@/utils/supabase/client'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  location: FormattedLocation | null
  onClose: () => void
}

export default function DeleteConfirmationModal({
  isOpen,
  location,
  onClose,
}: DeleteConfirmationModalProps) {
  const handleDelete = async () => {
    if (!location) return

    try {
      const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', location.id)

      if (error) throw error

      onClose()
      window.location.reload() // Refresh to update the list
    } catch (error) {
      console.error('Error deleting location:', error)
      alert('Error al eliminar el local')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
          >
            <div className="flex items-center gap-3 text-red-500 dark:text-red-400 mb-4">
              <AlertTriangle className="h-6 w-6 flex-shrink-0" />
              <h2 className="text-xl font-semibold">Confirmar Eliminación</h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              ¿Estás seguro que deseas eliminar el local <strong>{location?.name}</strong>? Esta acción no se puede deshacer.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 