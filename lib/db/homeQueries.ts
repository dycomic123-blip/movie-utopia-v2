import { unstable_cache } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { videoInclude } from '@/lib/db/videoMapper'

export const getHomeVideos = unstable_cache(
  async () => {
    return prisma.video.findMany({
      include: videoInclude,
      orderBy: { likesCount: 'desc' },
      take: 32
    })
  },
  ['home-videos'],
  { revalidate: 30, tags: ['home-videos'] }
)
