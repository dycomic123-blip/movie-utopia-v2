import { VideoItem } from '@/lib/types/video'
import { Heart, DollarSign, Play } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { GenreBadge } from './GenreBadge'
import Link from 'next/link'

interface VideoCardProps {
  video: VideoItem
}

export function VideoCard({ video }: VideoCardProps) {
  const handleClick = () => {
    // Save scroll position before navigating
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString())
    }
  }

  return (
    <Link href={`/video/${video.id}`} onClick={handleClick}>
      <article className="group relative overflow-hidden rounded-xl bg-card cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div
          style={{ aspectRatio: video.aspectRatio }}
          className="relative w-full overflow-hidden bg-muted"
        >
          <img
            src={video.thumbnail}
            alt={`${video.title} by ${video.author.name}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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

              {/* Tips with dollar sign */}
              <div className="flex items-center gap-1.5 text-white/90">
                <DollarSign className="h-4 w-4 text-amber-500" />
                <span className="font-medium">${video.tips.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
