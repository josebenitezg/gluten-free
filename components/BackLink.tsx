"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export function BackLink() {
  const pathname = usePathname()
  const showBack = pathname?.startsWith('/chat')
  if (!showBack) return null
  return (
    <Link
      href="/"
      aria-label="Volver al inicio"
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
    >
      <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
    </Link>
  )
}


