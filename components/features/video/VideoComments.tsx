'use client'

import { useEffect, useMemo, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageCircle, Send, Reply, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/components/features/auth/AuthProvider'
import { useUserProfile } from '@/components/features/auth/UserProfileProvider'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { cn } from '@/lib/utils'
import { CommentItem } from '@/lib/types/comment'

interface VideoCommentsProps {
  videoId: string
}

const MAX_COMMENT_LENGTH = 500

export function VideoComments({ videoId }: VideoCommentsProps) {
  const { currentUserId } = useAuth()
  const { profile } = useUserProfile()
  const { t, locale } = useLanguage()
  const numericUserId = useMemo(() => Number(currentUserId), [currentUserId])
  const [comments, setComments] = useState<CommentItem[]>([])
  const [commentInput, setCommentInput] = useState('')
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyInput, setReplyInput] = useState('')

  // 加载评论列表
  useEffect(() => {
    const loadComments = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/videos/${videoId}/comments`)
        if (!response.ok) throw new Error('Failed to load comments')
        
        const data = await response.json()
        setComments(data.comments || [])
      } catch (error) {
        console.error('Failed to load comments:', error)
        toast.error(t('failedToLoadComments') || 'Failed to load comments')
      } finally {
        setIsLoading(false)
      }
    }

    loadComments()
  }, [videoId, t])

  const handleSubmitComment = async () => {
    if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
      toast.error(t('pleaseLogin'))
      return
    }

    const content = commentInput.trim()
    if (!content) return

    if (isCommentSubmitting) return
    setIsCommentSubmitting(true)

    try {
      const response = await fetch(`/api/videos/${videoId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorId: numericUserId,
          content
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to post comment')
      }

      const newComment = await response.json()
      setComments(prev => [newComment, ...prev])
      setCommentInput('')
      toast.success(t('commentPosted') || 'Comment posted successfully')
    } catch (error) {
      console.error('Failed to post comment:', error)
      toast.error(error instanceof Error ? error.message : t('failedToPostComment') || 'Failed to post comment')
    } finally {
      setIsCommentSubmitting(false)
    }
  }

  const handleSubmitReply = async (parentId: number) => {
    if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
      toast.error(t('pleaseLogin'))
      return
    }

    const content = replyInput.trim()
    if (!content) return

    try {
      const response = await fetch(`/api/videos/${videoId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorId: numericUserId,
          content,
          parentId
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to post reply')
      }

      const newReply = await response.json()
      
      // 更新评论列表，将回复添加到对应的父评论
      setComments(prev => prev.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          }
        }
        return comment
      }))
      
      setReplyInput('')
      setReplyingTo(null)
      toast.success(t('replyPosted') || 'Reply posted successfully')
    } catch (error) {
      console.error('Failed to post reply:', error)
      toast.error(error instanceof Error ? error.message : t('failedToPostReply') || 'Failed to post reply')
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
      toast.error(t('pleaseLogin'))
      return
    }

    if (!confirm(t('confirmDeleteComment') || 'Are you sure you want to delete this comment?')) {
      return
    }

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete comment')
      }

      // 从列表中移除评论
      setComments(prev => prev.filter(c => c.id !== commentId))
      toast.success(t('commentDeleted') || 'Comment deleted successfully')
    } catch (error) {
      console.error('Failed to delete comment:', error)
      toast.error(t('failedToDeleteComment') || 'Failed to delete comment')
    }
  }

  const formatCommentTime = (value: string) => {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (diffSeconds < 60) return t('justNow')
    if (diffSeconds < 3600) {
      const mins = Math.floor(diffSeconds / 60)
      return locale === 'zh' ? `${mins}${t('minutesAgo')}` : `${mins} ${t('minutesAgo')}`
    }
    if (diffSeconds < 86400) {
      const hrs = Math.floor(diffSeconds / 3600)
      return locale === 'zh' ? `${hrs}${t('hoursAgo')}` : `${hrs} ${t('hoursAgo')}`
    }
    if (diffSeconds < 86400 * 7) {
      const days = Math.floor(diffSeconds / 86400)
      return locale === 'zh' ? `${days}${t('daysAgo')}` : `${days} ${t('daysAgo')}`
    }
    return date.toLocaleDateString()
  }

  const renderComment = (comment: CommentItem, isReply = false) => (
    <div key={comment.id} className={cn("flex items-start gap-2", isReply && "ml-10")}>
      <Avatar className="h-8 w-8 ring-1 ring-white/10 flex-shrink-0">
        <AvatarImage src={comment.author.avatar ?? ''} alt={comment.author.name} />
        <AvatarFallback className="text-xs">
          {comment.author.name?.[0] ?? 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground truncate">
            {comment.author.name}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {formatCommentTime(comment.createdAt)}
          </span>
        </div>
        <p className="mt-1 text-sm text-neutral-200 whitespace-pre-wrap break-words">
          {comment.content}
        </p>
        
        {/* 操作按钮 */}
        <div className="mt-2 flex items-center gap-3">
          {!isReply && (
            <button
              onClick={() => setReplyingTo(comment.id)}
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Reply className="h-3 w-3" />
              {t('reply') || 'Reply'}
            </button>
          )}
          
          {comment.authorId === numericUserId && (
            <button
              onClick={() => handleDeleteComment(comment.id)}
              className="text-xs text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" />
              {t('delete') || 'Delete'}
            </button>
          )}
        </div>

        {/* 回复输入框 */}
        {replyingTo === comment.id && (
          <div className="mt-3 flex items-start gap-2">
            <Avatar className="h-7 w-7 ring-1 ring-white/10">
              <AvatarImage src={profile?.avatar ?? ''} alt="Your avatar" />
              <AvatarFallback className="text-xs">{profile?.name?.[0] ?? t('you')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <textarea
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                placeholder={t('writeReply') || 'Write a reply...'}
                rows={2}
                maxLength={MAX_COMMENT_LENGTH}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {replyInput.trim().length}/{MAX_COMMENT_LENGTH}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setReplyingTo(null)
                      setReplyInput('')
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    {t('cancel') || 'Cancel'}
                  </button>
                  <button
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyInput.trim()}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      !replyInput.trim()
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    <Send className="h-3.5 w-3.5" />
                    {t('send')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 显示回复 */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map(reply => renderComment(reply, true))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="bg-transparent">
      <div className="p-4 sm:p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{t('comments')}</span>
            <span className="text-xs text-muted-foreground">{comments.length}</span>
          </div>
        </div>

        {/* 评论输入框 */}
        <div className="mt-3 space-y-2">
          <div className="flex items-start gap-2">
            <Avatar className="h-8 w-8 ring-1 ring-white/10">
              <AvatarImage src={profile?.avatar ?? ''} alt={profile?.name ?? 'User avatar'} />
              <AvatarFallback className="text-xs">{profile?.name?.[0] ?? t('you')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 gap-4 flex flex-col">
              <textarea
                value={commentInput}
                onChange={(event) => setCommentInput(event.target.value)}
                placeholder={t('writeComment')}
                rows={2}
                maxLength={MAX_COMMENT_LENGTH}
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {commentInput.trim().length}/{MAX_COMMENT_LENGTH}
                </span>
                <button
                  onClick={handleSubmitComment}
                  disabled={isCommentSubmitting || !commentInput.trim()}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    isCommentSubmitting || !commentInput.trim()
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  <Send className="h-3.5 w-3.5" />
                  {t('send')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 评论列表 */}
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="text-xs text-muted-foreground text-center py-4">
              {t('loading') || 'Loading...'}
            </div>
          )}
          {!isLoading && comments.length === 0 && (
            <div className="text-xs text-muted-foreground text-center py-4">
              {t('noComments') || 'No comments yet. Be the first to comment!'}
            </div>
          )}
          {!isLoading && comments.map((comment) => renderComment(comment))}
        </div>
      </div>
    </div>
  )
}
