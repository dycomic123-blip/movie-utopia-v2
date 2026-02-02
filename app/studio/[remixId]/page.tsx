import { StudioContainer } from '@/components/features/studio/StudioContainer'
import { mockVideos } from '@/lib/data/mockVideos'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    remixId: string
  }>
}

export function generateStaticParams() {
  return mockVideos.map((video) => ({
    remixId: video.id,
  }))
}

export default async function StudioRemixPage({ params }: PageProps) {
  const { remixId } = await params
  const sourceVideo = mockVideos.find((v) => v.id === remixId)

  if (!sourceVideo) {
    notFound()
  }

  return <StudioContainer remixSourceId={remixId} sourceVideo={sourceVideo} />
}
