'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasAcceptedDisclaimer = localStorage.getItem('disclaimerAccepted')
    if (!hasAcceptedDisclaimer) {
      setIsOpen(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('disclaimerAccepted', 'true')
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
                <div className="flex items-center gap-3 text-amber-500 dark:text-amber-400 mb-4">
                  <AlertTriangle className="h-6 w-6 flex-shrink-0" />
                  <h2 className="text-xl font-semibold">Aviso Importante</h2>
                </div>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <p>
                    Esta aplicación es una herramienta informativa diseñada para ayudar a encontrar opciones sin gluten en Paraguay.
                  </p>
                  <p>
                    <strong>Importante:</strong> La información proporcionada no sustituye el consejo médico profesional. Para cualquier consulta relacionada con la enfermedad celíaca o la dieta sin gluten, por favor consulte con un profesional de la salud calificado.
                  </p>
                  <p>
                    Siempre verifique directamente con los establecimientos la disponibilidad y las medidas de prevención de contaminación cruzada.
                  </p>
                </div>
                <button
                  onClick={handleAccept}
                  className="w-full mt-6 px-4 py-2 bg-[#00F879] text-gray-900 rounded-lg hover:bg-[#00F879]/90 transition-colors"
                >
                  Entiendo y acepto
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
} 