'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { FormattedLocation } from '@/data/locations'
import { supabase } from '@/utils/supabase/client'

interface LocationFormProps {
  location?: FormattedLocation | null
  onClose: () => void
}

export default function LocationForm({ location, onClose }: LocationFormProps) {
  const [formData, setFormData] = useState({
    nombre_local: location?.name || '',
    ciudad: location?.address || '',
    categoria: location?.category || '',
    es_gluten_free: location?.isGlutenFree || false,
    coordenadas: location ? `${location.lat},${location.lng}` : '',
    whatsapp: location?.whatsapp || '',
    redes_sociales: {
      instagram: location?.social.instagram || '',
      facebook: location?.social.facebook || '',
      x: location?.social.twitter || '',
    },
    servicios: {
      delivery: location?.services.some(s => s.type === 'delivery') || false,
      pick_up: location?.services.some(s => s.type === 'pick_up') || false,
      en_lugar: location?.services.some(s => s.type === 'en_lugar') || false,
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (location) {
        // Update existing location
        const { error } = await supabase
          .from('locations')
          .update({
            nombre_local: formData.nombre_local,
            ciudad: formData.ciudad,
            categoria: formData.categoria,
            es_gluten_free: formData.es_gluten_free,
            coordenadas: formData.coordenadas,
            whatsapp: formData.whatsapp,
            redes_sociales: formData.redes_sociales,
            servicios: formData.servicios,
          })
          .eq('id', location.id)

        if (error) throw error
      } else {
        // Create new location
        const { error } = await supabase
          .from('locations')
          .insert([{
            nombre_local: formData.nombre_local,
            ciudad: formData.ciudad,
            categoria: formData.categoria,
            es_gluten_free: formData.es_gluten_free,
            coordenadas: formData.coordenadas,
            whatsapp: formData.whatsapp,
            redes_sociales: formData.redes_sociales,
            servicios: formData.servicios,
          }])

        if (error) throw error
      }

      onClose()
      window.location.reload() // Refresh to update the list
    } catch (error) {
      console.error('Error saving location:', error)
      alert('Error al guardar el local')
    }
  }

  return (
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
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {location ? 'Editar Local' : 'Nuevo Local'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nombre del Local
              </label>
              <input
                type="text"
                value={formData.nombre_local}
                onChange={(e) => setFormData({ ...formData, nombre_local: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ciudad
              </label>
              <input
                type="text"
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Categoría
              </label>
              <input
                type="text"
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Coordenadas (lat,lng)
              </label>
              <input
                type="text"
                value={formData.coordenadas}
                onChange={(e) => setFormData({ ...formData, coordenadas: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="-25.123456,-57.123456"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="es_gluten_free"
                checked={formData.es_gluten_free}
                onChange={(e) => setFormData({ ...formData, es_gluten_free: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="es_gluten_free" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                100% Sin Gluten
              </label>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Servicios</p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.servicios.delivery}
                    onChange={(e) => setFormData({
                      ...formData,
                      servicios: { ...formData.servicios, delivery: e.target.checked }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Delivery</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.servicios.pick_up}
                    onChange={(e) => setFormData({
                      ...formData,
                      servicios: { ...formData.servicios, pick_up: e.target.checked }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Pick up</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.servicios.en_lugar}
                    onChange={(e) => setFormData({
                      ...formData,
                      servicios: { ...formData.servicios, en_lugar: e.target.checked }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">En el local</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                WhatsApp
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="wa.me/+595991234567"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Instagram
                </label>
                <input
                  type="text"
                  value={formData.redes_sociales.instagram}
                  onChange={(e) => setFormData({
                    ...formData,
                    redes_sociales: { ...formData.redes_sociales, instagram: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="usuario"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Facebook
                </label>
                <input
                  type="text"
                  value={formData.redes_sociales.facebook}
                  onChange={(e) => setFormData({
                    ...formData,
                    redes_sociales: { ...formData.redes_sociales, facebook: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="URL de Facebook"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Twitter/X
                </label>
                <input
                  type="text"
                  value={formData.redes_sociales.x}
                  onChange={(e) => setFormData({
                    ...formData,
                    redes_sociales: { ...formData.redes_sociales, x: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="usuario"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
            >
              {location ? 'Guardar Cambios' : 'Crear Local'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
} 