import { NextResponse } from 'next/server'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const originalName = file.name || 'upload'
  const ext = originalName.includes('.') ? originalName.split('.').pop() : ''
  const safeExt = ext ? `.${ext}` : ''
  const filename = `${randomUUID()}${safeExt}`
  const uploadDir = join(process.cwd(), 'public', 'uploads')

  await mkdir(uploadDir, { recursive: true })
  await writeFile(join(uploadDir, filename), buffer)

  return NextResponse.json({
    url: `/uploads/${filename}`
  })
}
