import { loginAction } from '@/app/actions'

export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'var(--bg-surface)',
        borderRadius: 'var(--r-lg)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
      }}>
        <div style={{ marginBottom: '32px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-kmbs.png" alt="kmbs" style={{ height: '28px' }} />
        </div>

        <h1 style={{ fontSize: 'var(--fs-h2)', fontWeight: 400, marginBottom: '8px' }}>
          Адмін-панель
        </h1>
        <p style={{ color: 'var(--fg-muted)', marginBottom: '32px' }}>
          Введіть пароль для доступу
        </p>

        <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--fs-meta)', letterSpacing: 'var(--tracking-eyebrow)', color: 'var(--fg-2)', marginBottom: '8px' }}>
              Пароль
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              style={{
                width: '100%',
                border: 'none',
                borderBottom: '1px solid var(--kmbs-graphite)',
                background: 'transparent',
                padding: '8px 0',
                fontSize: 'var(--fs-body)',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          <LoginError searchParams={searchParams} />

          <button
            type="submit"
            style={{
              marginTop: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--kmbs-graphite)',
              borderRadius: 'var(--r-pill)',
              padding: '10px 24px',
              fontSize: 'var(--fs-body)',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            Увійти <span style={{ color: 'var(--kmbs-blue)' }}>→</span>
          </button>
        </form>
      </div>
    </main>
  )
}

async function LoginError({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams
  if (!params.error) return null
  return (
    <p style={{ color: 'rgb(180,30,30)', fontSize: 'var(--fs-meta)' }}>
      Невірний пароль
    </p>
  )
}
