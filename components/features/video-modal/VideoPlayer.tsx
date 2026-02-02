'use client'

import { VideoItem } from '@/lib/types/video'

interface VideoPlayerProps {
  video: VideoItem
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div className="relative h-full w-full bg-black">
      <video
        src={video.videoUrl}
        poster={video.thumbnail}
        controls
        autoPlay
        className="h-full w-full object-contain"
        aria-label={`${video.title} by ${video.author.name}`}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
