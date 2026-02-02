'use client'

import { mockVideos } from '@/lib/data/mockVideos'
import { getTopTenVideos } from '@/lib/utils/rankings'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export function TopTenList() {
  const topTen = getTopTenVideos(mockVideos)

  return (
    <div className="space-y-3">
      {topTen.map(({ video, rank }) => (
        <Link
          key={video.id}
          href={`/video/${video.id}`}
          className="group flex gap-4 rounded-lg p-2 transition-colors hover:bg-neutral-900"
        >
          {/* Rank Number */}
          <div className="flex-shrink-0">
            <svg width="40" height="50" viewBox="0 0 40 50" className="overflow-visible">
              <defs>
                <linearGradient id={`gradient-${rank}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              <text
                x="20"
                y="35"
                fontSize="32"
                fontWeight="bold"
                fill="none"
                stroke={`url(#gradient-${rank})`}
                strokeWidth="2"
                textAnchor="middle"
                className="font-serif"
              >
                {rank}
              </text>
            </svg>
          </div>

          {/* Thumbnail */}
          <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded bg-neutral-800">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 overflow-hidden">
            <h4 className="mb-1 line-clamp-1 text-sm font-medium text-white group-hover:text-violet-400">
              {video.title}
            </h4>
            <p className="mb-1 text-xs text-neutral-400">{video.author.name}</p>
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <Heart className="h-3 w-3" />
              <span>{video.likes.toLocaleString()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
