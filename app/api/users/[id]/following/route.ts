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

  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    include: {
      following: true
    },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json({
    items: following.map((item) => ({
      id: item.following.id,
      name: item.following.name,
      avatar: item.following.avatar,
      followersCount: item.following.followersCount
    }))
  })
}
