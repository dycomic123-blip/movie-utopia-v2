import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const accessKey = body?.accessKey

  if (!accessKey || typeof accessKey !== 'string') {
    return NextResponse.json({ error: 'Missing accessKey' }, { status: 400 })
  }

  if (accessKey.length !== 6) {
    return NextResponse.json({ error: 'Invalid accessKey' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { accessKey }
  })

  if (!user) {
    return NextResponse.json({ error: 'Invalid accessKey' }, { status: 401 })
  }

  return NextResponse.json(user)
}
