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

  const likes = await prisma.videoLike.findMany({
    where: { userId },
    include: {
      video: {
        include: videoInclude
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json({
    items: likes.map((item) => mapVideoToItem(item.video))
  })
}
