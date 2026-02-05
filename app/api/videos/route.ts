import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { mapVideoToItem, videoInclude } from '@/lib/db/videoMapper'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number(searchParams.get('limit') ?? 32)
  const offset = Number(searchParams.get('offset') ?? 0)
  const authorIdParam = searchParams.get('authorId')
  const parsedAuthorId = authorIdParam ? Number(authorIdParam) : NaN

  if (authorIdParam && (!Number.isInteger(parsedAuthorId) || parsedAuthorId <= 0)) {
    return NextResponse.json({ error: 'Invalid authorId' }, { status: 400 })
  }

  const videos = await prisma.video.findMany({
    where: Number.isInteger(parsedAuthorId) ? { authorId: parsedAuthorId } : undefined,
    include: videoInclude,
    orderBy: { createdAt: 'desc' },
    take: Number.isNaN(limit) ? 32 : Math.min(limit, 100),
    skip: Number.isNaN(offset) ? 0 : Math.max(0, offset)
  })

  return NextResponse.json({
    items: videos.map(mapVideoToItem)
  })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const {
    authorId,
    title,
    thumbnailUrl,
    videoUrl,
    genre,
    aspectRatio,
    durationSec,
    parentId
  } = body ?? {}

  const numericAuthorId = Number(authorId)
  const numericParentId = parentId ? Number(parentId) : null

  if (!Number.isInteger(numericAuthorId) || numericAuthorId <= 0 || !title || !thumbnailUrl || !videoUrl) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const video = await prisma.video.create({
    data: {
      authorId: numericAuthorId,
      title,
      thumbnailUrl,
      videoUrl,
      genre,
      aspectRatio,
      durationSec,
      parentId: numericParentId && Number.isInteger(numericParentId) ? numericParentId : null
    },
    include: videoInclude
  })

  return NextResponse.json(mapVideoToItem(video), { status: 201 })
}
