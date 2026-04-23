import { cookies } from 'next/headers'

const COOKIE_NAME = 'kmbs_admin'
const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return store.get(COOKIE_NAME)?.value === process.env.SESSION_SECRET
}

export async function setAuthCookie() {
  const store = await cookies()
  store.set(COOKIE_NAME, process.env.SESSION_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })
}

export async function clearAuthCookie() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}
