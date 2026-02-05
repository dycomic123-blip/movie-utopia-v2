import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { mapVideoToItem, videoInclude } from '@/lib/db/videoMapper'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params
  const userId = Number(id)

  if (!Number.isInteger(userId) || userId <= 0) {
    return NextResponse.json({ error: 'Invalid user id' }, { status: 400 })
  }

  const videos = await prisma.video.findMany({
    where: { authorId: userId },
    include: videoInclude,
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json({
    items: videos.map(mapVideoToItem)
  })
}
