import { PrismaClient } from '@prisma/client'

import { mockVideos } from '../lib/data/mockVideos'

const prisma = new PrismaClient()

async function resetData() {
  await prisma.videoTip.deleteMany()
  await prisma.videoLike.deleteMany()
  await prisma.follow.deleteMany()
  await prisma.video.deleteMany()
  await prisma.user.deleteMany()
}

async function ensureAccessKeyUser() {
  await prisma.user.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      name: 'Access Key User',
      accessKey: 'szy888'
    },
    update: {
      accessKey: 'szy888'
    }
  })

  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"User"', 'id'), (SELECT MAX(id) FROM "User"))`
  )
}

async function upsertUsers() {
  const seen = new Map<string, { key: string; name: string; avatar?: string; followers: number }>()

  for (const video of mockVideos) {
    const author = video.author
    if (!seen.has(author.id)) {
      seen.set(author.id, {
        key: `seed:${author.id}`,
        name: author.name,
        avatar: author.avatar,
        followers: 0
      })
    }
  }

  const idMap = new Map<string, number>()

  for (const author of seen.values()) {
    const user = await prisma.user.upsert({
      where: { authUserId: author.key },
      create: {
        authUserId: author.key,
        name: author.name,
        avatar: author.avatar,
        followersCount: 0
      },
      update: {
        name: author.name,
        avatar: author.avatar,
        followersCount: 0
      }
    })

    idMap.set(author.key, user.id)
  }

  return idMap
}

async function upsertVideos(userIdMap: Map<string, number>) {
  const videoIdMap = new Map<string, number>()

  for (const video of mockVideos) {
    const authorKey = `seed:${video.author.id}`
    const authorId = userIdMap.get(authorKey)

    if (!authorId) {
      throw new Error(`Missing author for ${authorKey}`)
    }

    const created = await prisma.video.create({
      data: {
        authorId,
        title: video.title,
        thumbnailUrl: video.thumbnail,
        videoUrl: video.videoUrl,
        genre: video.genre,
        aspectRatio: video.aspectRatio,
        durationSec: video.duration,
        likesCount: 0,
        tipsCount: 0,
        tipsAmount: 0,
        createdAt: new Date(video.createdAt)
      }
    })

    videoIdMap.set(video.id, created.id)
  }

  return videoIdMap
}

async function applyRemixes(videoIdMap: Map<string, number>) {
  for (const video of mockVideos) {
    if (!video.remixParent?.videoId) continue

    const videoId = videoIdMap.get(video.id)
    const parentId = videoIdMap.get(video.remixParent.videoId)
    if (!videoId || !parentId) continue

    await prisma.video.update({
      where: { id: videoId },
      data: { parentId }
    })
  }
}

async function main() {
  await resetData()
  await ensureAccessKeyUser()
  const userIdMap = await upsertUsers()
  const videoIdMap = await upsertVideos(userIdMap)
  await applyRemixes(videoIdMap)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
