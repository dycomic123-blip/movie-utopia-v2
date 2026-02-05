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

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params
  const userId = Number(id)
  const body = await request.json().catch(() => null)

  if (!Number.isInteger(userId) || userId <= 0) {
    return NextResponse.json({ error: 'Invalid user id' }, { status: 400 })
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      authUserId: body?.authUserId,
      name: body?.name,
      avatar: body?.avatar,
      bio: body?.bio,
      walletBalance: body?.walletBalance,
      followersCount: body?.followersCount,
      followingCount: body?.followingCount
    }
  })

  return NextResponse.json(user)
}
