import { VideoItem } from '@/lib/types/video'
import { Heart, Coins, Play } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GenreBadge } from './GenreBadge'
import Link from 'next/link'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface VideoCardProps {
  video: VideoItem
  fixedHeight?: boolean // 是否使用固定高度（用于列表页面）
}

export function VideoCard({ video, fixedHeight = false }: VideoCardProps) {
  const handleClick = () => {
    // Save scroll position before navigating
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString())
    }
  }

  // Generate a random aspect ratio variation for masonry effect
  // Use video.id as seed for consistency
  // 如果 fixedHeight 为 true，则不使用随机高度
  const randomHeight = useMemo(() => {
    if (fixedHeight) return 1.0 // 固定高度，不使用随机变化
    const seed = parseInt(video.id) || 0
    const variations = [0.85, 0.95, 1.0, 1.1, 1.2, 1.3]
    return variations[seed % variations.length]
  }, [video.id, fixedHeight])

  const adjustedAspectRatio = video.aspectRatio * randomHeight
  // 在固定高度模式下，使用统一的 16:9 比例
  const finalAspectRatio = fixedHeight ? 16 / 9 : adjustedAspectRatio

  return (
    <Link href={`/video/${video.id}`} onClick={handleClick} prefetch>
      <article className="group relative overflow-hidden rounded-xl bg-card cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <div
          style={{ aspectRatio: finalAspectRatio }}
          className="relative w-full overflow-hidden bg-muted"
        >
          <img
            src={video.thumbnail}
            alt={`${video.title} by ${video.author.name}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />

          {/* Play Button Overlay - Frosted Glass */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <div className="relative">
              {/* Soft Glow */}
              <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl scale-150" />

              {/* Frosted Glass Button */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl shadow-sm ring-1 ring-white/30 scale-90 group-hover:scale-100 transition-all duration-500 ease-out">
                <Play className="h-5 w-5 text-white fill-white ml-0.5 drop-shadow-lg" />
              </div>
            </div>
          </div>

          {/* Info overlay - Always visible */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 transition-all duration-300 ease-in-out">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-8 w-8 border border-white/20">
                <AvatarImage src={video.author.avatar} alt={video.author.name} />
                <AvatarFallback>{video.author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-white/80">{video.author.name}</span>
            </div>



            <div className="flex items-center gap-4 text-xs">
              {/* Likes with red heart */}
              <div className="flex items-center gap-1.5 text-white/90">
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                <span className="font-medium">{video.likes.toLocaleString()}</span>
              </div>

              {/* Tips with credits icon */}
              <div className="flex items-center gap-1.5 text-white/90">
                <Coins className="h-4 w-4 text-amber-500" />
                <span className="font-medium">{video.tips.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
