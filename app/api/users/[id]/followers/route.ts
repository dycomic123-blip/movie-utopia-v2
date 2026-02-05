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

  const followers = await prisma.follow.findMany({
    where: { followingId: userId },
    include: {
      follower: true
    },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json({
    items: followers.map((item) => ({
      id: item.follower.id,
      name: item.follower.name,
      avatar: item.follower.avatar,
      followersCount: item.follower.followersCount
    }))
  })
}
