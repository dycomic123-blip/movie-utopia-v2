import { cn } from '@/lib/utils'

interface GenreBadgeProps {
  genre: string
  className?: string
}

const genreColors: Record<string, string> = {
  Action: 'bg-red-500/20 text-red-400 border-red-500/30',
  Drama: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Comedy: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Sci-Fi': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Horror: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  Romance: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  Thriller: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
}

export function GenreBadge({ genre, className }: GenreBadgeProps) {
  const colorClass = genreColors[genre] || genreColors.Drama

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm',
        colorClass,
        className
      )}
    >
      {genre}
    </span>
  )
}
