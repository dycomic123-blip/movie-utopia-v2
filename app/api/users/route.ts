import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json({ items: users })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const { authUserId, name, avatar, bio } = body ?? {}

  if (!name) {
    return NextResponse.json({ error: 'Missing name' }, { status: 400 })
  }

  if (authUserId) {
    const user = await prisma.user.upsert({
      where: { authUserId },
      create: {
        authUserId,
        name,
        avatar,
        bio
      },
      update: {
        name,
        avatar,
        bio
      }
    })

    return NextResponse.json(user, { status: 201 })
  }

  const user = await prisma.user.create({
    data: {
      name,
      avatar,
      bio
    }
  })

  return NextResponse.json(user, { status: 201 })
}
