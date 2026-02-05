import { HeroContent } from '@/lib/types/video'

export function getMockHeroContent(): HeroContent {
  return {
    id: 'hero-1',
    title: 'Movie Utopia',
    description: 'Premium AI-powered video platform with cutting-edge features',
    coverImage: '/hero-image.jpg',
    videoUrl: '/hero-video.mp4',
    videoUrls: [
      '/hero-video-1.mp4',
      '/hero-video-2.mp4',
      '/hero-video-3.mp4',
      '/hero-video-4.mp4'
    ],
    genre: 'Brand'
  }
}
