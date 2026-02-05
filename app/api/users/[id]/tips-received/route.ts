import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params
  const userId = Number(id)

  if (!Number.isInteger(userId) || userId <= 0) {
    return NextResponse.json({ error: 'Invalid user id' }, { status: 400 })
  }

  const result = await prisma.videoTip.aggregate({
    where: { receiverId: userId },
    _sum: { amount: true }
  })

  return NextResponse.json({
    total: Number(result._sum.amount ?? 0)
  })
}
