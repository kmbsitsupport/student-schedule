import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { logoutAction } from '@/app/actions'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) {
    redirect('/admin/login')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--kmbs-hairline)',
        padding: '0 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-kmbs.png" alt="kmbs" style={{ height: '22px' }} />
          <span style={{ color: 'var(--kmbs-hairline)' }}>|</span>
          <span style={{ fontSize: 'var(--fs-meta)', letterSpacing: 'var(--tracking-eyebrow)', color: 'var(--fg-2)' }}>
            розклад — адмін
          </span>
        </div>
        <form action={logoutAction}>
          <button type="submit" style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 'var(--fs-meta)',
            letterSpacing: 'var(--tracking-eyebrow)',
            color: 'var(--fg-muted)',
            fontFamily: 'inherit',
          }}>
            Вийти →
          </button>
        </form>
      </header>
      <main style={{ flex: 1, padding: '40px 30px', maxWidth: '900px', width: '100%', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  )
}
