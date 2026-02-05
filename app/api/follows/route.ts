import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const followerId = Number(body?.followerId)
  const followingId = Number(body?.followingId)

  if (!Number.isInteger(followerId) || !Number.isInteger(followingId)) {
    return NextResponse.json({ error: 'Missing followerId or followingId' }, { status: 400 })
  }

  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } }
    })

    if (existing) {
      return existing
    }

    const follow = await tx.follow.create({
      data: { followerId, followingId }
    })

    await tx.user.update({
      where: { id: followerId },
      data: { followingCount: { increment: 1 } }
    })

    await tx.user.update({
      where: { id: followingId },
      data: { followersCount: { increment: 1 } }
    })

    return follow
  })

  revalidateTag('home-videos', 'max')
  revalidateTag('video-by-id', 'max')
  revalidateTag('video-related', 'max')

  return NextResponse.json(result, { status: 201 })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const followerId = Number(searchParams.get('followerId'))
  const followingId = Number(searchParams.get('followingId'))

  if (!Number.isInteger(followerId) || !Number.isInteger(followingId)) {
    return NextResponse.json({ error: 'Missing followerId or followingId' }, { status: 400 })
  }

  const existing = await prisma.follow.findUnique({
    where: { followerId_followingId: { followerId, followingId } }
  })

  return NextResponse.json({ following: Boolean(existing) })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const followerId = Number(searchParams.get('followerId'))
  const followingId = Number(searchParams.get('followingId'))

  if (!Number.isInteger(followerId) || !Number.isInteger(followingId)) {
    return NextResponse.json({ error: 'Missing followerId or followingId' }, { status: 400 })
  }

  await prisma.$transaction(async (tx) => {
    const existing = await tx.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } }
    })

    if (!existing) return

    await tx.follow.delete({
      where: { followerId_followingId: { followerId, followingId } }
    })

    await tx.user.update({
      where: { id: followerId },
      data: { followingCount: { decrement: 1 } }
    })

    await tx.user.update({
      where: { id: followingId },
      data: { followersCount: { decrement: 1 } }
    })
  })

  revalidateTag('home-videos', 'max')
  revalidateTag('video-by-id', 'max')
  revalidateTag('video-related', 'max')

  return NextResponse.json({ followerId, followingId, deleted: true })
}
