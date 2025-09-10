"use client"
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const onClick = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }
  return (
    <Button variant="ghost" size="icon" aria-label="Cerrar sesión" onClick={onClick}>
      <LogOut className="h-4 w-4" />
    </Button>
  )
}


