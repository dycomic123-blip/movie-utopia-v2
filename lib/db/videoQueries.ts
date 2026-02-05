import { unstable_cache } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { videoInclude } from '@/lib/db/videoMapper'

export const getVideoById = unstable_cache(
  async (id: number) => {
    return prisma.video.findUnique({
      where: { id },
      include: videoInclude
    })
  },
  ['video-by-id'],
  { revalidate: 30 }
)

export const getRelatedVideos = unstable_cache(
  async (excludeId: number) => {
    return prisma.video.findMany({
      where: { id: { not: excludeId } },
      include: videoInclude,
      orderBy: { createdAt: 'desc' },
      take: 8
    })
  },
  ['video-related'],
  { revalidate: 30 }
)
