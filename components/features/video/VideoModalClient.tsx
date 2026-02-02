'use client'

import { VideoItem, Creator } from '@/lib/types/video'
import { useRouter } from 'next/navigation'
import { VideoModal } from './VideoModal'

interface VideoModalClientProps {
  video: VideoItem
  creators: Creator[]
  relatedVideos: VideoItem[]
}

export function VideoModalClient({ video, creators, relatedVideos }: VideoModalClientProps) {
  const router = useRouter()

  const handleClose = () => {
    router.back()
  }

  return (
    <VideoModal
      video={video}
      creators={creators}
      relatedVideos={relatedVideos}
      onClose={handleClose}
    />
  )
}
