import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { DeleteProgramButton } from '@/components/DeleteProgramButton'

export default async function AdminPage() {
  const programs = await prisma.program.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h1 style={{ fontSize: 'var(--fs-h1)' }}>Програми</h1>
        <Link href="/admin/programs/new" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--kmbs-graphite)',
          borderRadius: 'var(--r-pill)',
          padding: '10px 24px',
          fontSize: 'var(--fs-body)',
          textDecoration: 'none',
          color: 'var(--fg)',
        }}>
          Додати <span style={{ color: 'var(--kmbs-blue)' }}>→</span>
        </Link>
      </div>

      {programs.length === 0 ? (
        <div style={{
          background: 'var(--bg-surface)',
          borderRadius: 'var(--r-lg)',
          padding: '40px',
          textAlign: 'center',
          color: 'var(--fg-muted)',
        }}>
          Програм ще немає. Додайте першу.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {programs.map(p => (
            <div key={p.id} style={{
              background: 'var(--bg-surface)',
              borderRadius: 'var(--r-lg)',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: 'var(--fs-h4)', fontWeight: 500 }}>{p.name}</span>
                  {!p.isPublic && (
                    <span style={{
                      fontSize: 'var(--fs-micro)',
                      letterSpacing: 'var(--tracking-eyebrow)',
                      color: 'var(--fg-muted)',
                      border: '1px solid var(--kmbs-hairline)',
                      borderRadius: 'var(--r-xs)',
                      padding: '2px 6px',
                    }}>
                      прихована
                    </span>
                  )}
                </div>
                <div style={{ marginTop: '4px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <a href={`/${p.slug}`} target="_blank" style={{
                    fontSize: 'var(--fs-meta)',
                    color: 'var(--kmbs-blue-deep)',
                    textDecoration: 'none',
                    letterSpacing: 'var(--tracking-meta)',
                  }}>
                    /{p.slug}
                  </a>
                  <span style={{ fontSize: 'var(--fs-micro)', color: 'var(--fg-muted)' }}>
                    {p.sheetUrl.length > 50 ? p.sheetUrl.slice(0, 50) + '…' : p.sheetUrl}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <Link href={`/admin/programs/${p.id}`} style={{
                  fontSize: 'var(--fs-meta)',
                  letterSpacing: 'var(--tracking-eyebrow)',
                  color: 'var(--fg)',
                  textDecoration: 'none',
                  padding: '6px 14px',
                  border: '1px solid var(--kmbs-hairline)',
                  borderRadius: 'var(--r-pill)',
                }}>
                  Редагувати
                </Link>
                <DeleteProgramButton id={p.id} name={p.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
