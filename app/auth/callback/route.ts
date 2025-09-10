import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  let next = searchParams.get('next') ?? '/'
  if (!next.startsWith('/')) next = '/'

  if (!code) {
    return NextResponse.redirect(new URL('/login', origin))
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(error.message)}`, origin))
  }

  const forwardedHost = request.headers.get('x-forwarded-host')
  const isLocalEnv = origin.includes('localhost') || (forwardedHost?.includes('localhost') ?? false)
  const baseUrl = isLocalEnv ? origin : `https://${forwardedHost ?? new URL(origin).host}`

  return NextResponse.redirect(new URL(next, baseUrl))
}


