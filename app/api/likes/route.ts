import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const userId = Number(body?.userId)
  const videoId = Number(body?.videoId)

  if (!Number.isInteger(userId) || !Number.isInteger(videoId)) {
    return NextResponse.json({ error: 'Missing userId or videoId' }, { status: 400 })
  }

  const result = await prisma.$transaction(async (tx) => {
    const existing = await tx.videoLike.findUnique({
      where: { userId_videoId: { userId, videoId } }
    })

    if (existing) return existing

    const like = await tx.videoLike.create({
      data: { userId, videoId }
    })

    await tx.video.update({
      where: { id: videoId },
      data: { likesCount: { increment: 1 } }
    })

    return like
  })

  revalidateTag('home-videos', 'max')
  revalidateTag('video-by-id', 'max')
  revalidateTag('video-related', 'max')

  return NextResponse.json(result, { status: 201 })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = Number(searchParams.get('userId'))
  const videoId = Number(searchParams.get('videoId'))

  if (!Number.isInteger(userId) || !Number.isInteger(videoId)) {
    return NextResponse.json({ error: 'Missing userId or videoId' }, { status: 400 })
  }

  const existing = await prisma.videoLike.findUnique({
    where: { userId_videoId: { userId, videoId } }
  })

  return NextResponse.json({ liked: Boolean(existing) })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = Number(searchParams.get('userId'))
  const videoId = Number(searchParams.get('videoId'))

  if (!Number.isInteger(userId) || !Number.isInteger(videoId)) {
    return NextResponse.json({ error: 'Missing userId or videoId' }, { status: 400 })
  }

  await prisma.$transaction(async (tx) => {
    const existing = await tx.videoLike.findUnique({
      where: { userId_videoId: { userId, videoId } }
    })

    if (!existing) return

    await tx.videoLike.delete({
      where: { userId_videoId: { userId, videoId } }
    })

    await tx.video.update({
      where: { id: videoId },
      data: { likesCount: { decrement: 1 } }
    })
  })

  revalidateTag('home-videos', 'max')
  revalidateTag('video-by-id', 'max')
  revalidateTag('video-related', 'max')

  return NextResponse.json({ userId, videoId, deleted: true })
}
