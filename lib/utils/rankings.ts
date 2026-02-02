import { VideoItem } from '@/lib/types/video'

export interface RankedVideo {
  video: VideoItem
  rank: number
}

export function getTopTenVideos(allVideos: VideoItem[]): RankedVideo[] {
  const sorted = [...allVideos]
    .sort((a, b) => b.likes - a.likes) // Sort by likes descending
    .slice(0, 10) // Take top 10

  return sorted.map((video, index) => ({
    video,
    rank: index + 1,
  }))
}

export function getGenreFrequency(allVideos: VideoItem[]): Map<string, number> {
  const frequency = new Map<string, number>()

  allVideos.forEach((video) => {
    const count = frequency.get(video.genre) || 0
    frequency.set(video.genre, count + 1)
  })

  return frequency
}
