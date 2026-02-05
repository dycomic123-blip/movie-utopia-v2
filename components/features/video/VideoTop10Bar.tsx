'use client'

import { VideoItem } from '@/lib/types/video'
import { Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface VideoTop10BarProps {
  relatedVideos: VideoItem[]
}

export function VideoTop10Bar({ relatedVideos }: VideoTop10BarProps) {
  const { t } = useLanguage()
  const topVideos = relatedVideos.slice(0, 10)

  if (topVideos.length === 0) return null

  return (
    <div className="border-t border-white/10 bg-[#0a0a0c]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <Trophy className="h-4 w-4 text-amber-500" />
        <span className="text-sm font-medium text-white">{t('top10Recommendations')}</span>
      </div>
      <div className="px-4 py-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {topVideos.map((v, index) => (
            <a
              key={v.id}
              href={`/video/${v.id}`}
              className="flex-shrink-0 group cursor-pointer"
            >
              <div className="relative w-40 sm:w-48">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full aspect-video object-cover rounded-lg group-hover:ring-2 ring-primary/50 transition-all"
                  loading="lazy"
                  decoding="async"
                />
                {/* Rank Badge */}
                <div className={cn(
                  "absolute top-2 left-2 w-6 h-6 flex items-center justify-center rounded-md text-xs font-black",
                  index < 3 ? "bg-amber-500 text-black" : "bg-black/70 text-white"
                )}>
                  {index + 1}
                </div>
              </div>
              <div className="mt-2 w-40 sm:w-48">
                <h4 className="text-xs font-medium text-white line-clamp-1 group-hover:text-primary transition-colors">
                  {v.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {v.likes.toLocaleString()} {t('likes')}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
