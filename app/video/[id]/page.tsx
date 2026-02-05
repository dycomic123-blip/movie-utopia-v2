import { notFound } from 'next/navigation'
import { VideoModalClient } from '@/components/features/video/VideoModalClient'
import { mapVideoToItem } from '@/lib/db/videoMapper'
import { getRelatedVideos, getVideoById } from '@/lib/db/videoQueries'

export const revalidate = 30

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function VideoPage({ params }: PageProps) {
  const { id } = await params
  const videoId = Number(id)

  if (!Number.isInteger(videoId) || videoId <= 0) {
    notFound()
  }

  const videoRecord = await getVideoById(videoId)

  if (!videoRecord) {
    notFound()
  }

  const relatedRecords = await getRelatedVideos(videoId)

  const video = mapVideoToItem(videoRecord)
  const relatedVideos = relatedRecords.map(mapVideoToItem)

  return (
    <VideoModalClient
      video={video}
      relatedVideos={relatedVideos}
    />
  )
}
