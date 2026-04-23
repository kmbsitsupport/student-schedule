import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { fetchSchedule, ScheduleDay } from '@/lib/fetchSchedule'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = await prisma.program.findUnique({ where: { slug } })
  if (!program) return {}
  return { title: `${program.name} — kmbs розклад` }
}

export default async function SchedulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const program = await prisma.program.findUnique({ where: { slug } })
  if (!program || !program.isPublic) notFound()

  let days: ScheduleDay[] = []
  let fetchError = false
  try {
    days = await fetchSchedule(program.sheetUrl)
  } catch {
    fetchError = true
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        position: 'sticky',
        top: '15px',
        zIndex: 10,
        padding: '0 15px',
        marginBottom: '40px',
      }}>
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--kmbs-graphite)',
          borderRadius: 'var(--r-xl)',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 'var(--page-max)',
          margin: '0 auto',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-kmbs.png" alt="kmbs" style={{ height: '22px' }} />
          <span style={{
            fontSize: 'var(--fs-meta)',
            letterSpacing: 'var(--tracking-eyebrow)',
            color: 'var(--fg-2)',
          }}>
            {program.name}
          </span>
        </div>
      </header>

      <main style={{
        flex: 1,
        maxWidth: '860px',
        width: '100%',
        margin: '0 auto',
        padding: '0 15px 80px',
      }}>
        {fetchError ? (
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--r-lg)',
            padding: '40px',
            textAlign: 'center',
            color: 'var(--fg-muted)',
          }}>
            Не вдалося завантажити розклад. Спробуйте пізніше.
          </div>
        ) : days.length === 0 ? (
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--r-lg)',
            padding: '40px',
            textAlign: 'center',
            color: 'var(--fg-muted)',
          }}>
            Розклад ще не заповнено.
          </div>
        ) : (
          days.map((day, di) => <DayBlock key={di} day={day} />)
        )}
      </main>

      <footer style={{
        background: 'var(--bg-dark)',
        color: 'var(--fg-on-dark)',
        padding: '40px 30px',
        marginTop: 'auto',
      }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-kmbs.png" alt="kmbs" style={{ height: '20px', filter: 'invert(1)' }} />
          <span style={{ fontSize: 'var(--fs-micro)', letterSpacing: 'var(--tracking-meta)', color: 'var(--fg-on-dark-muted)' }}>
            kmbs.ua
          </span>
        </div>
      </footer>
    </div>
  )
}

function DayBlock({ day }: { day: ScheduleDay }) {
  return (
    <section style={{ marginBottom: '40px' }}>
      {day.label && (
        <div style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-eyebrow)',
          color: 'var(--fg-2)',
          textTransform: 'uppercase',
          marginBottom: '16px',
          paddingLeft: '4px',
        }}>
          {day.label}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {day.rows.map((row, i) => (
          <div key={i} style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--r-lg)',
            padding: '20px 24px',
            display: 'grid',
            gridTemplateColumns: '100px 1fr',
            gap: '16px',
            alignItems: 'start',
          }}>
            <div style={{
              fontSize: 'var(--fs-micro)',
              letterSpacing: 'var(--tracking-meta)',
              color: 'var(--fg-2)',
              paddingTop: '4px',
              whiteSpace: 'nowrap',
            }}>
              {row.time}
            </div>

            <div>
              <h3 style={{ fontSize: 'var(--fs-h4)', fontWeight: 400, lineHeight: 1.2 }}>
                {row.event}
              </h3>

              {(row.speaker || row.location) && (
                <div style={{
                  marginTop: '8px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}>
                  {row.speaker && (
                    <span style={{
                      fontSize: 'var(--fs-meta)',
                      letterSpacing: 'var(--tracking-eyebrow)',
                      color: 'var(--fg-2)',
                    }}>
                      {row.speaker}
                    </span>
                  )}
                  {row.location && (
                    <span style={{
                      fontSize: 'var(--fs-meta)',
                      color: 'var(--fg-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10 2a6 6 0 0 0-6 6c0 4 6 10 6 10s6-6 6-10a6 6 0 0 0-6-6Zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/>
                      </svg>
                      {row.location}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
