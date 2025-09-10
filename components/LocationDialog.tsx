'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { MapPin } from 'lucide-react'
import { FormattedLocation } from '@/data/locations'
import Link from 'next/link'

interface LocationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  location: FormattedLocation | null
}

export default function LocationDialog({ open, onOpenChange, location }: LocationDialogProps) {
  if (!location) return null
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{location.name}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${location.isGlutenFree ? 'bg-green-600 text-white' : 'bg-amber-500 text-black'}`}>
              {location.isGlutenFree ? '100% Sin Gluten' : 'Opciones Sin Gluten'}
            </span>
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {location.address}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm opacity-80">{location.category}</p>
          <div className="flex flex-wrap gap-2">
            {location.services.map((s, i) => (
              <span key={i} className="px-2 py-1 rounded-full text-xs border border-border">{s.label}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            {location.whatsapp && (
              <a className="underline underline-offset-4" href={`https://wa.me/${location.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            )}
            {location.social.instagram && (
              <a className="underline underline-offset-4" href={`https://instagram.com/${location.social.instagram}`} target="_blank" rel="noopener noreferrer">Instagram</a>
            )}
            {location.social.facebook && (
              <a className="underline underline-offset-4" href={location.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            )}
            <Link className="inline-flex items-center gap-1 underline underline-offset-4" href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin className="h-4 w-4" /> Ver en Maps
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


