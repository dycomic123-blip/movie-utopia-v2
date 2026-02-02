'use client'

import { VideoItem } from '@/lib/types/video'
import { mockVideos } from '@/lib/data/mockVideos'
import { getRelatedVideos } from '@/lib/utils/relatedVideos'
import Link from 'next/link'
import { Heart } from 'lucide-react'

interface RelatedVideosProps {
  currentVideo: VideoItem
}

export function RelatedVideos({ currentVideo }: RelatedVideosProps) {
  const relatedVideos = getRelatedVideos(currentVideo, mockVideos, 8)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {relatedVideos.map((video) => (
        <Link
          key={video.id}
          href={`/video/${video.id}`}
          className="group relative overflow-hidden rounded-lg bg-neutral-900 transition-transform hover:scale-105"
        >
          <div style={{ aspectRatio: video.aspectRatio }} className="relative w-full">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute bottom-2 left-2 right-2">
                <p className="mb-1 line-clamp-1 text-xs font-medium text-white">
                  {video.title}
                </p>
                <div className="flex items-center gap-1 text-xs text-neutral-300">
                  <Heart className="h-3 w-3" />
                  <span>{video.likes.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
