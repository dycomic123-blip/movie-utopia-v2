'use client'

import { useEffect, useMemo, useState } from 'react'
import { VideoItem, Creator } from '@/lib/types/video'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, Share2, Coins, Repeat2, UserPlus, Copy, Check, Zap, MoreHorizontal, Flag, ChevronDown, Tag, Trophy, Facebook, Twitter, Linkedin, Link2, Mail, Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/features/auth/AuthProvider'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { useAppStore } from '@/lib/store'
import { toast } from 'sonner'

interface VideoSidebarProps {
  video: VideoItem
  creators: Creator[]
  relatedVideos: VideoItem[]
}

export function VideoSidebar({ video, creators, relatedVideos }: VideoSidebarProps) {
  const { currentUserId } = useAuth()
  const { t } = useLanguage()
  const numericUserId = useMemo(() => Number(currentUserId), [currentUserId])
  const credits = useAppStore((state) => state.credits)
  const setCredits = useAppStore((state) => state.setCredits)
  const [isGenresOpen, setIsGenresOpen] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followersCount, setFollowersCount] = useState(video.author.followers)
  const [isFollowAnimating, setIsFollowAnimating] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(video.likes)
  const [isLikeAnimating, setIsLikeAnimating] = useState(false)
  const [tipsAmount, setTipsAmount] = useState(video.tips)
  const [isCopied, setIsCopied] = useState(false)
  const [showTipModal, setShowTipModal] = useState(false)
  const [selectedTipAmount, setSelectedTipAmount] = useState<number | null>(null)
  const [isFollowSubmitting, setIsFollowSubmitting] = useState(false)
  const [isLikeSubmitting, setIsLikeSubmitting] = useState(false)
  const [isTipSubmitting, setIsTipSubmitting] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  useEffect(() => {
    setFollowersCount(video.author.followers)
    setLikesCount(video.likes)
    setTipsAmount(video.tips)
  }, [video.author.followers, video.likes, video.tips])

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

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(video.title)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

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

  const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror', 'Romance', 'Thriller']
  const topVideos = relatedVideos.slice(0, 10)

  return (
    <div className="flex flex-col h-full text-white/90">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-0">
        {/* Author Header */}
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-border">
              <AvatarImage src={video.author.avatar} alt={video.author.name} />
              <AvatarFallback>{video.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{video.author.name}</h3>
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

          {/* Social & Message */}
          <div className="flex items-center gap-2 mt-3">
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
            <button
              onClick={handleMessage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              {t('message')}
            </button>
          </div>

          {/* Remix Lineage */}
          {video.remixParent && (
            <div className="mt-3 flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Zap className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <p className="text-xs text-foreground">
                Based on video by{' '}
                <span className="font-semibold text-amber-500">
                  @{video.remixParent.authorName}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-4 border-b border-white/10 bg-white/3 space-y-3">
          <h2 className="font-bold text-lg">{video.title}</h2>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span className={cn(
                "font-medium transition-all",
                isLikeAnimating && "animate-bounce text-red-500 scale-125"
              )}>
                {likesCount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Coins className="h-4 w-4 text-amber-500" />
              <span className="font-medium">{tipsAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="divide-y divide-white/10">
          {/* Genres Section */}
          <div>
            <button
              onClick={() => setIsGenresOpen(!isGenresOpen)}
              className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Genres</span>
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                isGenresOpen && "rotate-180"
              )} />
            </button>
            {isGenresOpen && (
              <div className="px-4 pt-2 pb-3">
                <div className="flex flex-wrap gap-1.5">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-primary/10 hover:text-primary text-xs font-medium transition-colors"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Top 10 Section */}
          <div>
            <div className="flex items-center gap-2 p-4 bg-white/5">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">Top 10</span>
            </div>
            <div className="px-4 pb-4 space-y-2">
              {topVideos.map((v, index) => (
                <a key={v.id} href={`/video/${v.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <span className={cn(
                      "text-2xl font-black",
                      index < 3 ? "text-amber-500" : "text-muted-foreground"
                    )}>
                      {index + 1}
                    </span>
                  </div>
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className="w-16 h-12 object-cover rounded-md flex-shrink-0"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium line-clamp-1">{v.title}</h4>
                    <p className="text-xs text-muted-foreground">{v.likes.toLocaleString()} {t('likes')}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="border-t border-white/10 bg-black/40">
        {/* Row 1 - Like + Tip */}
        <div className="grid grid-cols-2 gap-1.5 p-2 border-b border-white/10 relative">
          <button
            onClick={handleLike}
            disabled={isLikeSubmitting}
            className={cn(
              "flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs transition-all",
              isLiked
                ? "bg-red-500 text-white hover:bg-red-600 scale-105"
                : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
            )}
          >
            <Heart className={cn("h-4 w-4 transition-all", isLiked && "fill-current scale-110")} />
            {t('like')}
          </button>
          <div className="relative">
            <button
              onClick={() => setShowTipModal(!showTipModal)}
              disabled={isTipSubmitting}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs bg-amber-500 text-white hover:bg-amber-600 transition-colors"
            >
              <Coins className="h-5 w-5" />
              {t('tip')}
            </button>

            {showTipModal && (
              <div className="absolute bottom-full right-0 mb-2 bg-[#141414] border border-white/10 rounded-xl shadow-2xl p-4 w-64 z-[100]">
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
                        "px-2 py-1.5 rounded-lg font-semibold text-xs transition-colors",
                        selectedTipAmount === amount
                          ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-400/40"
                          : "bg-muted hover:bg-amber-500/20 hover:text-amber-500"
                      )}
                    >
                      {amount}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowTipModal(false)}
                    className="flex-1 px-2 py-2 rounded-lg bg-muted hover:bg-muted/80 font-medium text-xs"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    disabled={selectedTipAmount == null}
                    onClick={() => selectedTipAmount != null && handleTip(selectedTipAmount)}
                    className={cn(
                      "flex-1 px-2 py-2 rounded-lg font-medium text-xs",
                      selectedTipAmount == null
                        ? "bg-amber-500/40 text-white/70 cursor-not-allowed"
                        : "bg-amber-500 text-white hover:bg-amber-600"
                    )}
                  >
                    {t('confirm')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Row 2 - Share + Remix */}
        <div className="grid grid-cols-2 gap-1.5 p-2 border-b border-white/10 relative">
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              {t('share')}
            </button>

            {showShareMenu && (
              <div className="absolute top-full left-0 mt-2 bg-[#141414] border border-white/10 rounded-xl shadow-2xl p-2 flex gap-2 z-20">
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-blue-500/10 transition-colors"
                  title="Facebook"
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-sky-500/10 transition-colors"
                  title="Twitter"
                >
                  <Twitter className="h-5 w-5 text-sky-500" />
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-blue-500/10 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-blue-700" />
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors"
                  title={t('copyLink')}
                >
                  <Link2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
          <a
            href={`/studio/index.html?remix=${encodeURIComponent(video.title)}&sourceId=${video.id}`}
            target="_blank"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Repeat2 className="h-4 w-4" />
            {t('remix')}
          </a>
        </div>

        {/* More Menu */}
        <div className="relative p-2">
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs bg-white/5 text-white hover:bg-white/10 transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
            {t('more')}
          </button>

          {showMoreMenu && (
            <div className="absolute top-full left-3 right-3 mt-2 bg-[#141414] border border-white/10 rounded-lg shadow-lg overflow-hidden z-20">
              <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-red-500">
                <Flag className="h-4 w-4" />
                {t('report')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
