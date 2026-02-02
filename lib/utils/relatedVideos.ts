import { VideoItem } from '@/lib/types/video'

interface VideoScore {
  video: VideoItem
  score: number
}

export function calculateRelevanceScore(target: VideoItem, candidate: VideoItem): number {
  let score = 0

  // Same genre: +50
  if (target.genre === candidate.genre) {
    score += 50
  }

  // Same author: +40
  if (target.author.id === candidate.author.id) {
    score += 40
  }

  // Similar aspect ratio: +30
  if (Math.abs(target.aspectRatio - candidate.aspectRatio) < 0.1) {
    score += 30
  }

  // Similar likes: +20
  if (target.likes > 0) {
    const likesRatio = Math.abs(target.likes - candidate.likes) / target.likes
    if (likesRatio < 0.2) {
      score += 20
    }
  }

  // Recent (within 7 days): +10
  const daysDiff =
    Math.abs(new Date(target.createdAt).getTime() - new Date(candidate.createdAt).getTime()) /
    (1000 * 60 * 60 * 24)
  if (daysDiff < 7) {
    score += 10
  }

  return score
}

export function getRelatedVideos(
  targetVideo: VideoItem,
  allVideos: VideoItem[],
  limit: number = 8
): VideoItem[] {
  const scores: VideoScore[] = allVideos
    .filter((v) => v.id !== targetVideo.id) // Exclude current video
    .map((video) => ({
      video,
      score: calculateRelevanceScore(targetVideo, video),
    }))
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, limit)

  return scores.map((s) => s.video)
}
