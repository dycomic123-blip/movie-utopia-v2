'use client'

import { useEffect, useMemo, useState } from 'react'
import { VideoItem } from '@/lib/types/video'
import { VideoPlayer } from './VideoPlayer'
import { VideoComments } from './VideoComments'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, Share2, Coins, Repeat2, UserPlus, Facebook, Twitter, Linkedin, Link2, Mail, Instagram, Youtube } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/features/auth/AuthProvider'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { useAppStore } from '@/lib/store'
import { toast } from 'sonner'

interface VideoModalClientProps {
  video: VideoItem
  relatedVideos: VideoItem[]
}

export function VideoModalClient({ video, relatedVideos }: VideoModalClientProps) {
  const { currentUserId } = useAuth()
  const { t } = useLanguage()
  const numericUserId = useMemo(() => Number(currentUserId), [currentUserId])
  const credits = useAppStore((state) => state.credits)
  const setCredits = useAppStore((state) => state.setCredits)

  const [isFollowing, setIsFollowing] = useState(false)
  const [followersCount, setFollowersCount] = useState(video.author.followers)
  const [isFollowAnimating, setIsFollowAnimating] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(video.likes)
  const [isLikeAnimating, setIsLikeAnimating] = useState(false)
  const [tipsAmount, setTipsAmount] = useState(video.tips)
  const [showTipModal, setShowTipModal] = useState(false)
  const [selectedTipAmount, setSelectedTipAmount] = useState<number | null>(null)
  const [isFollowSubmitting, setIsFollowSubmitting] = useState(false)
  const [isLikeSubmitting, setIsLikeSubmitting] = useState(false)
  const [isTipSubmitting, setIsTipSubmitting] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [video.id])

  useEffect(() => {
    setFollowersCount(video.author.followers)
    setLikesCount(video.likes)
    setTipsAmount(video.tips)
    setIsLiked(false)
    setShowTipModal(false)
    setSelectedTipAmount(null)
    setShowShareMenu(false)
  }, [video.id, video.author.followers, video.likes, video.tips])

  useEffect(() => {
    let isMounted = true

    const loadStates = async () => {
      if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
        if (isMounted) {
          setIsLiked(false)
          setIsFollowing(false)
        }
        return
      }

      try {
        const [likeRes, followRes] = await Promise.all([
          fetch(`/api/likes?userId=${numericUserId}&videoId=${Number(video.id)}`),
          fetch(`/api/follows?followerId=${numericUserId}&followingId=${Number(video.author.id)}`)
        ])

        if (likeRes.ok) {
          const likeData = await likeRes.json()
          if (isMounted) setIsLiked(Boolean(likeData?.liked))
        }
        if (followRes.ok) {
          const followData = await followRes.json()
          if (isMounted) setIsFollowing(Boolean(followData?.following))
        }
      } catch (error) {
        console.error(error)
      }
    }

    loadStates()

    return () => {
      isMounted = false
    }
  }, [numericUserId, video.id, video.author.id])

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

  const handleLike = async () => {
    if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
      toast.error(t('pleaseLogin'))
      return
    }

    try {
      if (isLikeSubmitting) return
      setIsLikeSubmitting(true)

      if (!isLiked) {
        setLikesCount(prev => prev + 1)
        setIsLikeAnimating(true)
        setTimeout(() => setIsLikeAnimating(false), 600)
        setIsLiked(true)

        const response = await fetch('/api/likes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: numericUserId, videoId: Number(video.id) })
        })
        if (!response.ok) throw new Error('Like failed')
        sessionStorage.setItem('homeNeedsRefresh', 'true')
      } else {
        setLikesCount(prev => Math.max(0, prev - 1))
        setIsLiked(false)

        const response = await fetch(`/api/likes?userId=${numericUserId}&videoId=${video.id}`, {
          method: 'DELETE'
        })
        if (!response.ok) throw new Error('Unlike failed')
        sessionStorage.setItem('homeNeedsRefresh', 'true')
      }
    } catch (error) {
      console.error(error)
      setIsLiked(prev => !prev)
      setLikesCount(prev => (isLiked ? prev + 1 : Math.max(0, prev - 1)))
      toast.error(t('likeFailed'))
    } finally {
      setIsLikeSubmitting(false)
    }
  }

  const handleTip = async (amount: number) => {
    if (!Number.isInteger(numericUserId) || numericUserId <= 0) {
      toast.error(t('pleaseLogin'))
      return
    }

    const previousCredits = credits

    try {
      if (isTipSubmitting) return
      if (credits < amount) {
        toast.error(t('insufficientBalance'))
        return
      }
      setIsTipSubmitting(true)

      setTipsAmount(prev => prev + amount)
      setCredits(prev => Math.max(0, prev - amount))
      setShowTipModal(false)
      setSelectedTipAmount(null)

      const response = await fetch('/api/tips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipperId: numericUserId,
          videoId: Number(video.id),
          amount
        })
      })
      if (!response.ok) {
        const data = await response.json().catch(() => null)
        const message = typeof data?.error === 'string' ? data.error : 'Tip failed'
        throw new Error(message)
      }
      sessionStorage.setItem('homeNeedsRefresh', 'true')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : ''
      if (errorMessage && errorMessage !== 'Insufficient balance') {
        console.error(error)
      }
      setTipsAmount(prev => Math.max(0, prev - amount))
      setCredits(previousCredits)
      if (errorMessage === 'Insufficient balance') {
        toast.error(t('insufficientBalance'))
      } else {
        toast.error(t('tipFailed'))
      }
    } finally {
      setIsTipSubmitting(false)
    }
  }

  const handleMessage = () => {
    toast.info(t('featureComingSoon'))
  }

  const authorCard = (
    <div className="p-4 bg-white/5 rounded-xl space-y-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 ring-2 ring-white/10">
          <AvatarImage src={video.author.avatar} alt={video.author.name} />
          <AvatarFallback>{video.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{video.author.name}</h3>
          <p className="text-sm text-muted-foreground">
            <span className={cn(isFollowAnimating && "animate-bounce text-primary")}>
              {followersCount.toLocaleString()}
            </span>
            {' '}{t('followers')}
          </p>
        </div>
        {/* Follow & Message buttons */}
        <div className="flex items-center gap-2 ">
          
          <button
            onClick={handleFollow}
            disabled={isFollowSubmitting}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              isFollowing
                ? "bg-white/10 text-muted-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <UserPlus className="h-3.5 w-3.5" />
            {isFollowing ? t('following') : t('follow')}
          </button>
          <button
            onClick={handleMessage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Social icons row */}
      <div className="flex items-center gap-2 justify-end">
        <button
          className="p-2 rounded-full bg-white/5 hover:bg-sky-500/20 transition-colors"
          title="Twitter"
        >
          <Twitter className="h-4 w-4 text-sky-400" />
        </button>
        <button
          className="p-2 rounded-full bg-white/5 hover:bg-pink-500/20 transition-colors"
          title="Instagram"
        >
          <Instagram className="h-4 w-4 text-pink-400" />
        </button>
        <button
          className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 transition-colors"
          title="YouTube"
        >
          <Youtube className="h-4 w-4 text-red-500" />
        </button>
        <button
          className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 transition-colors"
          title="Facebook"
        >
          <Facebook className="h-4 w-4 text-blue-500" />
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0c]">
      <div className="container mx-auto max-w-[1400px] px-4 pt-6 pb-16">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Main Content - Left */}
          <div className="space-y-4">
            {/* Author Card - Mobile Only */}
            <div className="lg:hidden">
              {authorCard}
            </div>

            {/* Video Player */}
            <div className="w-full bg-black rounded-xl overflow-hidden">
              <div className="aspect-video">
                <VideoPlayer video={video} />
              </div>
            </div>

            {/* Video Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {video.title}
            </h1>

            {/* Stats & Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-white/10">
              {/* Left Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{likesCount.toLocaleString()} {t('likes')}</span>
                <span>{tipsAmount.toLocaleString()} tips</span>
                <span>{new Date(video.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  disabled={isLikeSubmitting}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    isLiked
                      ? "bg-red-500/20 text-red-500"
                      : "bg-white/10 text-white hover:bg-white/20"
                  )}
                >
                  <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                  <span className={cn(isLikeAnimating && "animate-bounce")}>{t('like')}</span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowTipModal(!showTipModal)}
                    disabled={isTipSubmitting}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-amber-500/20 text-amber-500 hover:bg-amber-500/30 transition-colors"
                  >
                    <Coins className="h-4 w-4" />
                    {t('tip')}
                  </button>

                  {showTipModal && (
                    <div className="absolute top-full right-0 mt-2 bg-[#1a1a1d] border border-white/10 rounded-xl shadow-2xl p-4 w-72 z-50">
                      <div className="flex items-center gap-2 mb-3">
                        <Coins className="h-5 w-5 text-amber-500" />
                        <h3 className="font-bold text-sm">{t('sendTip')}</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[5, 10, 20, 50, 100, 200].map((amount) => (
                          <button
                            key={amount}
                            onClick={() => setSelectedTipAmount(amount)}
                            className={cn(
                              "px-3 py-2 rounded-lg font-semibold text-sm transition-colors",
                              selectedTipAmount === amount
                                ? "bg-amber-500 text-black"
                                : "bg-white/10 hover:bg-amber-500/20 hover:text-amber-500"
                            )}
                          >
                            {amount}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowTipModal(false)}
                          className="flex-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 font-medium text-sm"
                        >
                          {t('cancel')}
                        </button>
                        <button
                          disabled={selectedTipAmount == null}
                          onClick={() => selectedTipAmount != null && handleTip(selectedTipAmount)}
                          className={cn(
                            "flex-1 px-3 py-2 rounded-lg font-medium text-sm",
                            selectedTipAmount == null
                              ? "bg-amber-500/40 text-white/50 cursor-not-allowed"
                              : "bg-amber-500 text-black hover:bg-amber-400"
                          )}
                        >
                          {t('confirm')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    {t('share')}
                  </button>

                  {showShareMenu && (
                    <div className="absolute top-full right-0 mt-2 bg-[#1a1a1d] border border-white/10 rounded-xl shadow-2xl p-2 flex gap-1 z-50">
                      <button className="p-2 rounded-lg hover:bg-white/10" title="Facebook">
                        <Facebook className="h-5 w-5 text-blue-500" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10" title="Twitter">
                        <Twitter className="h-5 w-5 text-sky-400" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10" title="LinkedIn">
                        <Linkedin className="h-5 w-5 text-blue-600" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10" title={t('copyLink')}>
                        <Link2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                <a
                  href={`/studio/index.html?remix=${encodeURIComponent(video.title)}&sourceId=${video.id}`}
                  target="_blank"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                >
                  <Repeat2 className="h-4 w-4" />
                  {t('remix')}
                </a>
              </div>
            </div>

            {/* Video Description */}
            <div className="p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {video.description ?? t('videoDescription')}
              </p>
            </div>

            {/* Comments Section */}
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <VideoComments videoId={video.id} />
            </div>
          </div>

          {/* Sidebar - Right */}
          <div className="space-y-4 hidden lg:block">
            {/* Author Card - Desktop Only */}
            {authorCard}

            <h3 className="text-lg font-semibold text-white px-1">{t('top10Recommendations')}</h3>
            <div className="space-y-3">
              {relatedVideos.slice(0, 15).map((v, index) => (
                <a
                  key={v.id}
                  href={`/video/${v.id}`}
                  className="flex gap-3 group"
                >
                  <div className="relative w-40 flex-shrink-0">
                    <img
                      src={v.thumbnail}
                      alt={v.title}
                      className="w-full aspect-video object-cover rounded-lg group-hover:ring-2 ring-primary/50 transition-all"
                      loading="lazy"
                    />
                    {index < 3 && (
                      <div className="absolute top-1 left-1 w-5 h-5 flex items-center justify-center rounded bg-amber-500 text-black text-xs font-black">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-primary transition-colors">
                      {v.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{v.author.name}</p>
                    <p className="text-xs text-muted-foreground">{v.likes.toLocaleString()} {t('likes')}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
