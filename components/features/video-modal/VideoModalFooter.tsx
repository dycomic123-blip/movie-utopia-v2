'use client'

import { VideoItem } from '@/lib/types/video'
import { LikeButton } from './LikeButton'
import { ShareButton } from './ShareButton'
import { TipButton } from './TipButton'
import { RemixButton } from './RemixButton'

interface VideoModalFooterProps {
  video: VideoItem
}

export function VideoModalFooter({ video }: VideoModalFooterProps) {
  return (
    <div className="sticky bottom-0 border-t border-neutral-800 bg-[#141414] p-4">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <LikeButton videoId={video.id} />
        <ShareButton video={video} />
        <TipButton video={video} />
        <RemixButton videoId={video.id} />
      </div>
    </div>
  )
}
