import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

// DELETE /api/comments/[id] - 删除评论
export async function DELETE(request: Request, { params }: RouteParams) {
  const { id } = await params
  const commentId = Number(id)

  if (!Number.isInteger(commentId) || commentId <= 0) {
    return NextResponse.json({ error: 'Invalid comment id' }, { status: 400 })
  }

  try {
    // 获取评论信息
    const comment = await prisma.videoComment.findUnique({
      where: { id: commentId },
      select: {
        id: true,
        videoId: true,
        authorId: true,
        parentId: true
      }
    })

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    // 这里可以添加权限检查，确保只有评论作者或管理员可以删除
    // const { searchParams } = new URL(request.url)
    // const userId = Number(searchParams.get('userId'))
    // if (comment.authorId !== userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    // }

    // 删除评论（级联删除回复）并更新视频评论计数
    await prisma.$transaction([
      prisma.videoComment.delete({
        where: { id: commentId }
      }),
      // 只有顶级评论才减少视频的评论计数
      ...(comment.parentId
        ? []
        : [
            prisma.video.update({
              where: { id: comment.videoId },
              data: {
                commentsCount: {
                  decrement: 1
                }
              }
            })
          ])
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete comment:', error)
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}

// PATCH /api/comments/[id] - 更新评论（可选功能）
export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params
  const commentId = Number(id)

  if (!Number.isInteger(commentId) || commentId <= 0) {
    return NextResponse.json({ error: 'Invalid comment id' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      )
    }

    const trimmedContent = content.trim()
    if (!trimmedContent || trimmedContent.length > 500) {
      return NextResponse.json(
        { error: 'Comment content must be between 1 and 500 characters' },
        { status: 400 }
      )
    }

    // 检查评论是否存在
    const existingComment = await prisma.videoComment.findUnique({
      where: { id: commentId },
      select: { id: true }
    })

    if (!existingComment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 })
    }

    // 更新评论
    const comment = await prisma.videoComment.update({
      where: { id: commentId },
      data: {
        content: trimmedContent
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
    })

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Failed to update comment:', error)
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    )
  }
}
