import { Prisma, type User } from '@prisma/client'

import { VideoItem } from '@/lib/types/video'

export const videoInclude = {
  author: true,
  parent: {
    include: {
      author: true
    }
  }
} satisfies Prisma.VideoInclude

export type VideoWithRelations = Prisma.VideoGetPayload<{
  include: typeof videoInclude
}>

function mapAuthor(author: User): VideoItem['author'] {
  return {
    id: String(author.id),
    name: author.name,
    avatar: author.avatar ?? '',
    followers: author.followersCount
  }
}

export function mapVideoToItem(video: VideoWithRelations): VideoItem {
  const genre = (video.genre ?? 'Drama') as VideoItem['genre']

  return {
    id: String(video.id),
    title: video.title,
    description: video.description ?? undefined,
    author: mapAuthor(video.author),
    thumbnail: video.thumbnailUrl,
    videoUrl: video.videoUrl,
    genre,
    tags: video.tags ?? [],
    views: video.viewsCount,
    likes: video.likesCount,
    comments: video.commentsCount,
    tips: Number(video.tipsAmount ?? 0),
    aspectRatio: video.aspectRatio ?? 16 / 9,
    duration: video.durationSec ?? 0,
    createdAt: new Date(video.createdAt).toISOString(),
    remixParent: video.parent
      ? {
          videoId: String(video.parent.id),
          authorId: String(video.parent.author.id),
          authorName: video.parent.author.name
        }
      : undefined
  }
}
