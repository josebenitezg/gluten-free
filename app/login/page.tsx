import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, MailCheck } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Ingresar',
  description: 'Accedé para usar el chat',
}

async function signInWithGoogle() {
  'use server'
  const supabase = await createSupabaseServerClient()
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback?next=/chat`,
      queryParams: { access_type: 'offline', prompt: 'consent' },
    },
  })
  if (error) throw error
  redirect(data.url)
}

async function sendMagicLink(formData: FormData) {
  'use server'
  const email = String(formData.get('email') || '')
  const supabase = await createSupabaseServerClient()
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/chat`,
    },
  })
  redirect('/login?sent=1')
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>
}) {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.auth.getUser()
  if (data.user) redirect('/chat')
  const sp = await searchParams
  const sent = sp?.sent === '1'

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Ingresá para chatear</h1>
        {sent && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-center gap-2 rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400"
          >
            <MailCheck className="h-4 w-4" />
            <span>Revisá tu correo electrónico y hacé click en el enlace para ingresar.</span>
          </div>
        )}
        <form action={signInWithGoogle}>
          <Button className="w-full" variant="default">
            <Image src="/google_logo.svg" alt="Google" width={16} height={16} className="mr-2" />
            Continuar con Google
          </Button>
        </form>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>o</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <form action={sendMagicLink} className="space-y-3">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" name="email" type="email" placeholder="tu@gmail.com" required />
          </div>
          <Button type="submit" className="w-full" variant="secondary">
            <Mail className="mr-2 h-4 w-4" /> Enviarme link mágico
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center">
          Continuando aceptás nuestros términos y política de privacidad.
        </p>
      </div>
    </div>
  )
}


