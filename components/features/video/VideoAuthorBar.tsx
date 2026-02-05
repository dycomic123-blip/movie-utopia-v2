'use client'

import { useEffect, useMemo, useState } from 'react'
import { VideoItem } from '@/lib/types/video'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserPlus, Mail, Twitter, Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/features/auth/AuthProvider'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { toast } from 'sonner'

interface VideoAuthorBarProps {
  video: VideoItem
}

export function VideoAuthorBar({ video }: VideoAuthorBarProps) {
  const { currentUserId } = useAuth()
  const { t } = useLanguage()
  const numericUserId = useMemo(() => Number(currentUserId), [currentUserId])
  const [isFollowing, setIsFollowing] = useState(false)
  const [followersCount, setFollowersCount] = useState(video.author.followers)
  const [isFollowAnimating, setIsFollowAnimating] = useState(false)
  const [isFollowSubmitting, setIsFollowSubmitting] = useState(false)

  useEffect(() => {
    setFollowersCount(video.author.followers)
  }, [video.author.followers])

  useEffect(() => {
    let isMounted = true

    const loadFollowState = async () => {
      if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
        if (isMounted) setIsFollowing(false)
        return
      }

      try {
        const followRes = await fetch(`/api/follows?followerId=${numericUserId}&followingId=${Number(video.author.id)}`)
        if (followRes.ok) {
          const followData = await followRes.json()
          if (isMounted) setIsFollowing(Boolean(followData?.following))
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadFollowState()

    return () => {
      isMounted = false
    }
  }, [numericUserId, video.author.id])

  const handleFollow = async () => {
    if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
      toast.error(t('pleaseLogin'))
      return
    }

    if (String(numericUserId) === video.author.id) return

    try {
      if (isFollowSubmitting) return
      setIsFollowSubmitting(true)

      if (!isFollowing) {
        setFollowersCount(prev => prev + 1)
        setIsFollowAnimating(true)
        setTimeout(() => setIsFollowAnimating(false), 600)
        setIsFollowing(true)

        const response = await fetch('/api/follows', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ followerId: numericUserId, followingId: Number(video.author.id) })
        })
        if (!response.ok) throw new Error('Follow failed')
        sessionStorage.setItem('homeNeedsRefresh', 'true')
      } else {
        setFollowersCount(prev => Math.max(0, prev - 1))
        setIsFollowing(false)

        const response = await fetch(`/api/follows?followerId=${numericUserId}&followingId=${video.author.id}`, {
          method: 'DELETE'
        })
        if (!response.ok) throw new Error('Unfollow failed')
        sessionStorage.setItem('homeNeedsRefresh', 'true')
      }
    } catch (error) {
      console.error(error)
      setIsFollowing(prev => !prev)
      setFollowersCount(prev => (isFollowing ? prev + 1 : Math.max(0, prev - 1)))
      toast.error(t('followFailed'))
    } finally {
      setIsFollowSubmitting(false)
    }
  }

  const handleMessage = () => {
    toast.info(t('featureComingSoon'))
  }

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 bg-[#0a0a0c] border-b border-white/10">
      {/* Left: Author Info */}
      <div className="flex items-center gap-3 min-w-0">
        <Avatar className="h-10 w-10 ring-2 ring-white/10 flex-shrink-0">
          <AvatarImage src={video.author.avatar} alt={video.author.name} />
          <AvatarFallback>{video.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm text-white truncate">{video.author.name}</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span className={cn(
              "font-medium transition-all",
              isFollowAnimating && "animate-bounce text-primary scale-125"
            )}>
              {followersCount.toLocaleString()}
            </span>
            <span>{t('followers')}</span>
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Social Links */}
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-sky-500/20 transition-colors"
          title="Twitter"
        >
          <Twitter className="h-4 w-4 text-sky-400" />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-pink-500/20 transition-colors"
          title="Instagram"
        >
          <Instagram className="h-4 w-4 text-pink-400" />
        </button>

        {/* Message */}
        <button
          onClick={handleMessage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
          {t('message')}
        </button>

        {/* Follow */}
        <button
          onClick={handleFollow}
          disabled={isFollowSubmitting}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            isFollowing
              ? "bg-muted text-muted-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <UserPlus className="h-3.5 w-3.5" />
          {isFollowing ? t('following') : t('follow')}
        </button>
      </div>
    </div>
  )
}
