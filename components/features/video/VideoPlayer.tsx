'use client'

import { VideoItem } from '@/lib/types/video'

interface VideoPlayerProps {
  video: VideoItem
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <video
        className="w-full h-full object-contain"
        controls
        autoPlay
        loop
        src={video.videoUrl}
      >
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
