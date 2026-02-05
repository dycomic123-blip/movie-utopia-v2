'use client'

import { Zap } from 'lucide-react'

interface LineageBannerProps {
  remixParent: {
    videoId: string
    authorId: string
    authorName: string
  }
}

export function LineageBanner({ remixParent }: LineageBannerProps) {
  return (
    <div className="flex items-center gap-2 border-t border-neutral-800 bg-violet-950/20 px-4 py-3 text-sm">
      <Zap className="h-4 w-4 text-amber-400" />
      <span className="text-neutral-300">
        Based on video by{' '}
        <span className="font-medium text-white">@{remixParent.authorName}</span>
      </span>
    </div>
  )
}
