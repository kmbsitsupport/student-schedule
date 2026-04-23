'use client'

import { deleteProgramAction } from '@/app/actions'

export function DeleteProgramButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteProgramAction}
      onSubmit={e => {
        if (!confirm(`Видалити «${name}»?`)) e.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        style={{
          fontSize: 'var(--fs-meta)',
          letterSpacing: 'var(--tracking-eyebrow)',
          color: 'var(--fg-muted)',
          background: 'none',
          border: '1px solid var(--kmbs-hairline)',
          borderRadius: 'var(--r-pill)',
          padding: '6px 14px',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Видалити
      </button>
    </form>
  )
}
