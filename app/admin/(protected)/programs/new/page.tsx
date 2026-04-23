import { createProgramAction } from '@/app/actions'
import { ProgramForm } from '@/components/ProgramForm'

export default function NewProgramPage() {
  return (
    <div>
      <h1 style={{ fontSize: 'var(--fs-h1)', marginBottom: '32px' }}>Нова програма</h1>
      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-lg)', padding: '32px', maxWidth: '600px' }}>
        <ProgramForm action={createProgramAction} />
      </div>
    </div>
  )
}
