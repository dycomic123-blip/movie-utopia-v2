import { StudioContainer } from '@/components/features/studio/StudioContainer'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { mapVideoToItem, videoInclude } from '@/lib/db/videoMapper'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{
    remixId: string
  }>
}

export default async function StudioRemixPage({ params }: PageProps) {
  const { remixId } = await params
  const remixVideoId = Number(remixId)

  if (!Number.isInteger(remixVideoId) || remixVideoId <= 0) {
    notFound()
  }

  const sourceRecord = await prisma.video.findUnique({
    where: { id: remixVideoId },
    include: videoInclude
  })

  if (!sourceRecord) {
    notFound()
  }

  return (
    <StudioContainer
      remixSourceId={remixId}
      sourceVideo={mapVideoToItem(sourceRecord)}
    />
  )
}
