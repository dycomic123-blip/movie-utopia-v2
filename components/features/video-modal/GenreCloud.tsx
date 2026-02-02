'use client'

import { VideoItem } from '@/lib/types/video'
import { mockVideos } from '@/lib/data/mockVideos'
import { getGenreFrequency } from '@/lib/utils/rankings'
import { useRouter } from 'next/navigation'

interface GenreCloudProps {
  currentVideo: VideoItem
}

const genreColors: Record<string, string> = {
  Action: 'text-red-400 hover:text-red-300',
  Drama: 'text-blue-400 hover:text-blue-300',
  Comedy: 'text-yellow-400 hover:text-yellow-300',
  'Sci-Fi': 'text-purple-400 hover:text-purple-300',
  Horror: 'text-orange-400 hover:text-orange-300',
  Romance: 'text-pink-400 hover:text-pink-300',
  Thriller: 'text-green-400 hover:text-green-300',
}

export function GenreCloud({ currentVideo }: GenreCloudProps) {
  const router = useRouter()
  const genreFrequency = getGenreFrequency(mockVideos)

  const maxFrequency = Math.max(...Array.from(genreFrequency.values()))
  const minFontSize = 12
  const maxFontSize = 24

  const genres = Array.from(genreFrequency.entries()).sort((a, b) => b[1] - a[1])

  const handleGenreClick = (genre: string) => {
    // Navigate to home with genre filter (future implementation)
    router.push(`/?genre=${encodeURIComponent(genre)}`)
  }

  return (
    <div className="flex flex-wrap gap-3">
      {genres.map(([genre, count]) => {
        const fontSize =
          minFontSize + ((count / maxFrequency) * (maxFontSize - minFontSize))
        const isCurrentGenre = genre === currentVideo.genre

        return (
          <button
            key={genre}
            onClick={() => handleGenreClick(genre)}
            className={`cursor-pointer font-medium transition-colors ${
              genreColors[genre] || 'text-neutral-400 hover:text-neutral-300'
            } ${isCurrentGenre ? 'underline' : ''}`}
            style={{ fontSize: `${fontSize}px` }}
            aria-label={`Filter by ${genre} (${count} videos)`}
          >
            {genre}
          </button>
        )
      })}
    </div>
  )
}
