import { mockVideos } from '@/lib/data/mockVideos'
import { generateMockCreators } from '@/lib/data/mockCreators'
import { notFound } from 'next/navigation'
import { VideoModalClient } from '@/components/features/video/VideoModalClient'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export function generateStaticParams() {
  return mockVideos.map((video) => ({
    id: video.id,
  }))
}

export default async function VideoPage({ params }: PageProps) {
  const { id } = await params
  const video = mockVideos.find((v) => v.id === id)

  if (!video) {
    notFound()
  }

  const creators = generateMockCreators()
  const relatedVideos = mockVideos.filter((v) => v.id !== id).slice(0, 10)

  return (
    <VideoModalClient
      video={video}
      creators={creators}
      relatedVideos={relatedVideos}
    />
  )
}
