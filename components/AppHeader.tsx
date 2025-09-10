import Link from 'next/link'
import { createSupabaseServerClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { WheatOff, Bot } from 'lucide-react'
import { LogoutButton } from '@/components/LogoutButton'
import DarkModeToggle from '@/components/DarkModeToggle'
import { BackLink } from '@/components/BackLink'

export default async function AppHeader() {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  const user = data.user
  const userName = (user?.user_metadata as Record<string, unknown> | undefined)?.['full_name'] as string | undefined
  const avatarUrl = (user?.user_metadata as Record<string, unknown> | undefined)?.['avatar_url'] as string | undefined
    || (user?.user_metadata as Record<string, unknown> | undefined)?.['picture'] as string | undefined

  return (
    <header className="glass-navbar py-3 px-4 md:py-4 md:px-6 flex-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BackLink />
          <Link href="/" className="flex items-center gap-2">
          <WheatOff className="mr-1 h-5 w-5 md:h-6 md:w-6 text-[#00F879]" />
          <span className="text-xl md:text-2xl font-bold text-[#00F879]">Paraguay Sin Gluten</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild className="px-6 md:px-8 bg-[#00F879] text-gray-900 hover:bg-[#00F879]/90">
            <Link href="/chat" aria-label="Abrir chat" className="inline-flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>Celia</span>
            </Link>
          </Button>
          <DarkModeToggle />
          {user ? (
            <>
              <Link href="/chat" aria-label="Ir al chat">
                <Avatar className="size-8 ring-1 ring-border">
                  <AvatarImage alt="" src={avatarUrl} />
                  <AvatarFallback>{(userName || user.email || 'US').slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Ingresar</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}


