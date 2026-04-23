'use client'

import Link from 'next/link'

interface Program {
  id: string
  name: string
  slug: string
  sheetUrl: string
  isPublic: boolean
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  border: 'none',
  borderBottom: '1px solid var(--kmbs-graphite)',
  background: 'transparent',
  padding: '8px 0',
  fontSize: 'var(--fs-body)',
  fontFamily: 'inherit',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 'var(--fs-meta)',
  letterSpacing: 'var(--tracking-eyebrow)',
  color: 'var(--fg-2)',
  marginBottom: '6px',
}

export function ProgramForm({
  action,
  program,
}: {
  action: (formData: FormData) => Promise<void>
  program?: Program
}) {
  return (
    <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {program && <input type="hidden" name="id" value={program.id} />}

      <div>
        <label style={labelStyle}>Назва програми</label>
        <input
          type="text"
          name="name"
          required
          defaultValue={program?.name}
          placeholder="Presidents MBA London 2025"
          style={fieldStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>URL-slug</label>
        <input
          type="text"
          name="slug"
          required
          defaultValue={program?.slug}
          placeholder="pmba-london-2025"
          pattern="[a-z0-9-]+"
          title="Тільки маленькі літери, цифри та дефіс"
          style={fieldStyle}
        />
        <p style={{ marginTop: '6px', fontSize: 'var(--fs-micro)', color: 'var(--fg-muted)' }}>
          Буде доступно на: <code>ваш-домен.com/pmba-london-2025</code>
        </p>
      </div>

      <div>
        <label style={labelStyle}>CSV-посилання на Google Sheets</label>
        <input
          type="url"
          name="sheetUrl"
          required
          defaultValue={program?.sheetUrl}
          placeholder="https://docs.google.com/spreadsheets/d/.../export?format=csv"
          style={fieldStyle}
        />
        <p style={{ marginTop: '6px', fontSize: 'var(--fs-micro)', color: 'var(--fg-muted)' }}>
          Google Sheets → Файл → Поділитись та експортувати → Опублікувати у вебі → CSV
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="checkbox"
          name="isPublic"
          id="isPublic"
          defaultChecked={program?.isPublic ?? true}
          style={{ width: '16px', height: '16px', accentColor: 'var(--kmbs-graphite)' }}
        />
        <label htmlFor="isPublic" style={{ fontSize: 'var(--fs-body)', cursor: 'pointer' }}>
          Публічна (доступна без логіну)
        </label>
      </div>

      <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
        <button type="submit" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--kmbs-black)',
          color: 'var(--fg-on-dark)',
          border: 'none',
          borderRadius: 'var(--r-pill)',
          padding: '10px 24px',
          fontSize: 'var(--fs-body)',
          fontFamily: 'inherit',
          cursor: 'pointer',
        }}>
          {program ? 'Зберегти' : 'Створити'} <span>→</span>
        </button>
        <Link href="/admin" style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '10px 24px',
          fontSize: 'var(--fs-body)',
          color: 'var(--fg-muted)',
          textDecoration: 'none',
          borderRadius: 'var(--r-pill)',
          border: '1px solid var(--kmbs-hairline)',
        }}>
          Скасувати
        </Link>
      </div>
    </form>
  )
}
