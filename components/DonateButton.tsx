'use client'

import { HeartHandshake } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function DonateButton() {
  const pathname = usePathname()
  
  // Solo mostrar en la página principal
  if (pathname !== '/') return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Link
        href="/donate"
        className="flex items-center gap-2 px-4 py-2 bg-[#00F879] text-gray-900 rounded-full hover:bg-[#00F879]/90 transition-colors shadow-lg"
      >
        <HeartHandshake className="w-4 h-4" />
        <span className="text-sm font-medium">Apoyar</span>
      </Link>
    </motion.div>
  )
} 