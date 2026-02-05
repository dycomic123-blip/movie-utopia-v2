import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const tipperId = Number(body?.tipperId)
  const videoId = Number(body?.videoId)
  const amountValue = Number(body?.amount)

  if (!Number.isInteger(tipperId) || !Number.isInteger(videoId) || !Number.isFinite(amountValue)) {
    return NextResponse.json({ error: 'Missing tipperId, videoId or amount' }, { status: 400 })
  }

  if (amountValue <= 0) {
    return NextResponse.json({ error: 'Amount must be positive' }, { status: 400 })
  }

  const amount = new Prisma.Decimal(amountValue)

  const result = await prisma.$transaction(async (tx) => {
    const video = await tx.video.findUnique({
      where: { id: videoId },
      select: { authorId: true }
    })

    if (!video) {
      return { error: 'Video not found' }
    }

    const tipper = await tx.user.findUnique({
      where: { id: tipperId },
      select: { walletBalance: true }
    })

    if (!tipper) {
      return { error: 'Tipper not found' }
    }

    if (tipper.walletBalance.lt(amount)) {
      return { error: 'Insufficient balance' }
    }

    const tip = await tx.videoTip.create({
      data: {
        videoId,
        tipperId,
        receiverId: video.authorId,
        amount
      }
    })

    await tx.video.update({
      where: { id: videoId },
      data: {
        tipsCount: { increment: 1 },
        tipsAmount: { increment: amount }
      }
    })

    await tx.user.update({
      where: { id: video.authorId },
      data: { walletBalance: { increment: amount } }
    })

    await tx.user.update({
      where: { id: tipperId },
      data: { walletBalance: { decrement: amount } }
    })

    return tip
  })

  if ('error' in result) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  revalidateTag('home-videos', 'max')
  revalidateTag('video-by-id', 'max')
  revalidateTag('video-related', 'max')

  return NextResponse.json(result, { status: 201 })
}
