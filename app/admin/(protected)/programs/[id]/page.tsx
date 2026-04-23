import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { updateProgramAction } from '@/app/actions'
import { ProgramForm } from '@/components/ProgramForm'

export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const program = await prisma.program.findUnique({ where: { id } })
  if (!program) notFound()

  return (
    <div>
      <h1 style={{ fontSize: 'var(--fs-h1)', marginBottom: '32px' }}>Редагувати програму</h1>
      <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-lg)', padding: '32px', maxWidth: '600px' }}>
        <ProgramForm action={updateProgramAction} program={program} />
      </div>
    </div>
  )
}
