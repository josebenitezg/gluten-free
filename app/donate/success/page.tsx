'use client'

import { CheckCircle2, Home } from 'lucide-react'
import Link from 'next/link'

export default function DonateSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-md text-center">
        <div className="glass-card p-6">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-[#00F879]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Gracias por tu donación!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tu apoyo nos ayuda a seguir mejorando la plataforma para toda la comunidad.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00F879] text-gray-900 rounded-lg hover:bg-[#00F879]/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
} 