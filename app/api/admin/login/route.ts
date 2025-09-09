import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const pin = String(body?.pin || '')

    if (!process.env.ADMIN_PIN) {
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    const isValid = pin === process.env.ADMIN_PIN
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set('admin_session', '1', {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      path: '/',
      maxAge: 60 * 60 * 8, // 8h
    })
    return res
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}


