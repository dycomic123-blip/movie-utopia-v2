import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/videos/[id]/comments - 获取视频评论列表
export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params
  const videoId = Number(id)

  if (!Number.isInteger(videoId) || videoId <= 0) {
    return NextResponse.json({ error: 'Invalid video id' }, { status: 400 })
  }

  try {
    // 检查视频是否存在
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      select: { id: true }
    })

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    // 获取评论列表（只获取顶级评论，不包括回复）
    const comments = await prisma.videoComment.findMany({
      where: {
        videoId,
        parentId: null // 只获取顶级评论
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ comments, total: comments.length })
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

// POST /api/videos/[id]/comments - 创建新评论
export async function POST(request: Request, { params }: RouteParams) {
  const { id } = await params
  const videoId = Number(id)

  if (!Number.isInteger(videoId) || videoId <= 0) {
    return NextResponse.json({ error: 'Invalid video id' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const { authorId, content, parentId } = body

    // 验证必填字段
    if (!authorId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const numericAuthorId = Number(authorId)
    if (!Number.isInteger(numericAuthorId) || numericAuthorId <= 0) {
      return NextResponse.json({ error: 'Invalid author id' }, { status: 400 })
    }

    // 验证内容长度
    const trimmedContent = content.trim()
    if (!trimmedContent || trimmedContent.length > 500) {
      return NextResponse.json(
        { error: 'Comment content must be between 1 and 500 characters' },
        { status: 400 }
      )
    }

    // 检查用户是否存在
    const user = await prisma.user.findUnique({
      where: { id: numericAuthorId },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // 检查视频是否存在
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      select: { id: true }
    })

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    // 如果是回复评论，验证父评论是否存在
    if (parentId) {
      const numericParentId = Number(parentId)
      if (!Number.isInteger(numericParentId) || numericParentId <= 0) {
        return NextResponse.json(
          { error: 'Invalid parent comment id' },
          { status: 400 }
        )
      }

      const parentComment = await prisma.videoComment.findUnique({
        where: { id: numericParentId },
        select: { id: true, videoId: true }
      })

      if (!parentComment) {
        return NextResponse.json(
          { error: 'Parent comment not found' },
          { status: 404 }
        )
      }

      if (parentComment.videoId !== videoId) {
        return NextResponse.json(
          { error: 'Parent comment does not belong to this video' },
          { status: 400 }
        )
      }
    }

    // 创建评论并更新视频评论计数
    const [comment] = await prisma.$transaction([
      prisma.videoComment.create({
        data: {
          videoId,
          authorId: numericAuthorId,
          content: trimmedContent,
          parentId: parentId ? Number(parentId) : null
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        }
      }),
      // 只有顶级评论才增加视频的评论计数
      ...(parentId
        ? []
        : [
            prisma.video.update({
              where: { id: videoId },
              data: {
                commentsCount: {
                  increment: 1
                }
              }
            })
          ])
    ])

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('Failed to create comment:', error)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
