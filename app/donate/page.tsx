'use client'

import { useState } from 'react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const DONATION_AMOUNTS = [
  { value: 5000, label: '5.000 ₲' },
  { value: 10000, label: '10.000 ₲' },
  { value: 50000, label: '50.000 ₲' },
  { value: 100000, label: '100.000 ₲' },
]

export default function DonatePage() {
  const router = useRouter()
  const [selectedAmount, setSelectedAmount] = useState<number>(5000)
  const [customAmount, setCustomAmount] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDonate = async () => {
    setIsLoading(true)
    try {
      const amount = isCustom ? parseInt(customAmount) : selectedAmount
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Error al procesar la donación. Por favor, intente nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <button
          onClick={() => router.push('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </button>

        <div className="glass-card p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Apoya Paraguay Sin Gluten
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tu donación nos ayuda a mantener y mejorar la plataforma para toda la comunidad celíaca.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {DONATION_AMOUNTS.map((amount) => (
                <button
                  key={amount.value}
                  onClick={() => {
                    setSelectedAmount(amount.value)
                    setIsCustom(false)
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedAmount === amount.value && !isCustom
                      ? 'border-[#00F879] bg-[#00F879]/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#00F879]/50'
                  }`}
                >
                  {amount.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="number"
                placeholder="Otro monto"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setIsCustom(true)
                }}
                className="w-full p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 focus:border-[#00F879] focus:ring-1 focus:ring-[#00F879] dark:bg-gray-800"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                ₲
              </span>
            </div>

            <button
              onClick={handleDonate}
              disabled={isLoading || (isCustom && !customAmount)}
              className="w-full py-3 bg-[#00F879] text-gray-900 rounded-lg hover:bg-[#00F879]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Procesando...
                </>
              ) : (
                'Donar'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 