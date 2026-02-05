'use client'

import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { VideoItem } from '@/lib/types/video'

interface VideoPlayerProps {
  video: VideoItem
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = async () => {
    try {
      await videoRef.current?.play()
    } catch {
      // Ignore play errors (autoplay restrictions or user gesture requirements)
    }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        controls
        loop
        preload="metadata"
        poster={video.thumbnail}
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        src={video.videoUrl}
      >
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
          aria-label="Play video"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur ring-1 ring-white/30">
            <Play className="h-6 w-6 text-white fill-white translate-x-0.5" />
          </div>
        </button>
      )}
    </div>
  )
}
