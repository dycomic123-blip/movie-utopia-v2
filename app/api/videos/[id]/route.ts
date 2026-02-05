import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { mapVideoToItem, videoInclude } from '@/lib/db/videoMapper'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params
  const videoId = Number(id)

  if (!Number.isInteger(videoId) || videoId <= 0) {
    return NextResponse.json({ error: 'Invalid video id' }, { status: 400 })
  }

  const video = await prisma.video.findUnique({
    where: { id: videoId },
    include: videoInclude
  })

  if (!video) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  return NextResponse.json(mapVideoToItem(video))
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params
  const videoId = Number(id)
  const body = await request.json().catch(() => null)

  if (!Number.isInteger(videoId) || videoId <= 0) {
    return NextResponse.json({ error: 'Invalid video id' }, { status: 400 })
  }

  const video = await prisma.video.update({
    where: { id: videoId },
    data: {
      title: body?.title,
      thumbnailUrl: body?.thumbnailUrl,
      videoUrl: body?.videoUrl,
      genre: body?.genre,
      aspectRatio: body?.aspectRatio,
      durationSec: body?.durationSec
    },
    include: videoInclude
  })

  return NextResponse.json(mapVideoToItem(video))
}
