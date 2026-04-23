'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { setAuthCookie, clearAuthCookie, isAuthenticated } from '@/lib/auth'

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string
  if (password === process.env.ADMIN_PASSWORD) {
    await setAuthCookie()
    redirect('/admin')
  }
  redirect('/admin/login?error=1')
}

export async function logoutAction() {
  await clearAuthCookie()
  redirect('/admin/login')
}

export async function createProgramAction(formData: FormData) {
  if (!(await isAuthenticated())) redirect('/admin/login')

  const name = (formData.get('name') as string).trim()
  const slug = (formData.get('slug') as string).trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
  const sheetUrl = (formData.get('sheetUrl') as string).trim()
  const isPublic = formData.get('isPublic') === 'on'

  await prisma.program.create({ data: { name, slug, sheetUrl, isPublic } })
  revalidatePath('/admin')
  redirect('/admin')
}

export async function updateProgramAction(formData: FormData) {
  if (!(await isAuthenticated())) redirect('/admin/login')

  const id = formData.get('id') as string
  const name = (formData.get('name') as string).trim()
  const slug = (formData.get('slug') as string).trim().toLowerCase().replace(/[^a-z0-9-]/g, '-')
  const sheetUrl = (formData.get('sheetUrl') as string).trim()
  const isPublic = formData.get('isPublic') === 'on'

  await prisma.program.update({ where: { id }, data: { name, slug, sheetUrl, isPublic } })
  revalidatePath('/admin')
  revalidatePath(`/${slug}`)
  redirect('/admin')
}

export async function deleteProgramAction(formData: FormData) {
  if (!(await isAuthenticated())) redirect('/admin/login')

  const id = formData.get('id') as string
  await prisma.program.delete({ where: { id } })
  revalidatePath('/admin')
  redirect('/admin')
}
