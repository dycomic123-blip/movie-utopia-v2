'use client'

import { useState } from 'react'
import { VideoItem, Creator } from '@/lib/types/video'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, Share2, DollarSign, Repeat2, UserPlus, Copy, Check, Zap, MoreHorizontal, Flag, ChevronDown, Tag, Trophy, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoSidebarProps {
  video: VideoItem
  creators: Creator[]
  relatedVideos: VideoItem[]
}

export function VideoSidebar({ video, creators, relatedVideos }: VideoSidebarProps) {
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
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(video.title)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleFollow = () => {
    if (!isFollowing) {
      setFollowersCount(prev => prev + 1)
      setIsFollowAnimating(true)
      setTimeout(() => setIsFollowAnimating(false), 600)
    } else {
      setFollowersCount(prev => prev - 1)
    }
    setIsFollowing(!isFollowing)
  }

  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(prev => prev + 1)
      setIsLikeAnimating(true)
      setTimeout(() => setIsLikeAnimating(false), 600)
    }
    setIsLiked(!isLiked)
  }

  const handleTip = (amount: number) => {
    setTipsAmount(prev => prev + amount)
    setShowTipModal(false)
  }

  const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror', 'Romance', 'Thriller']
  const topVideos = relatedVideos.slice(0, 10)

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Content - Remove bottom padding */}
      <div className="flex-1 overflow-y-auto pb-0">
        {/* Author Header */}
        <div className="p-4 border-b border-border">
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
                <span>followers</span>
              </p>
            </div>
            <button
              onClick={handleFollow}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                isFollowing
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <UserPlus className="h-3.5 w-3.5" />
              {isFollowing ? 'Following' : 'Follow'}
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
        <div className="p-4 border-b border-border space-y-3">
          <h2 className="font-bold text-lg">{video.title}</h2>

          {/* Prompt with Copy */}
          <div className="relative">
            <div className="p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground min-h-[100px] flex items-start">
              <div className="flex-1">
                <div className="text-xs font-semibold mb-1 text-foreground">Prompt:</div>
                <div className="leading-relaxed">{video.title}</div>
              </div>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/80 backdrop-blur-sm hover:bg-background text-xs font-medium transition-colors"
            >
              {isCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>

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
              <DollarSign className="h-4 w-4 text-amber-500" />
              <span className="font-medium">${tipsAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="divide-y divide-border">
          {/* Genres Section */}
          <div>
            <button
              onClick={() => setIsGenresOpen(!isGenresOpen)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
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
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      className="px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary text-sm font-medium transition-colors"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Top 10 Section - Always Expanded */}
          <div>
            <div className="flex items-center gap-2 p-4 bg-muted/30">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">Top 10</span>
            </div>
            <div className="px-4 pb-4 space-y-2">
              {topVideos.map((v, index) => (
                <div key={v.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  {/* Giant Number */}
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
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium line-clamp-1">{v.title}</h4>
                    <p className="text-xs text-muted-foreground">{v.likes.toLocaleString()} likes</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Actions - Solid Buttons */}
      <div className="border-t border-border bg-card">
        {/* Row 1 - Like + Tip */}
        <div className="grid grid-cols-2 gap-2 p-3 border-b border-border relative">
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all",
              isLiked
                ? "bg-red-500 text-white hover:bg-red-600 scale-105"
                : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
            )}
          >
            <Heart className={cn("h-4 w-4 transition-all", isLiked && "fill-current scale-110")} />
            Like
          </button>
          <div className="relative">
            <button
              onClick={() => setShowTipModal(!showTipModal)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm bg-amber-500 text-white hover:bg-amber-600 transition-colors"
            >
              <DollarSign className="h-5 w-5" />
              Tip
            </button>

            {/* Tip Modal - Above Button */}
            {showTipModal && (
              <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-xl shadow-2xl p-4 w-64 z-20">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-5 w-5 text-amber-500" />
                  <h3 className="font-bold text-sm">Send Tip</h3>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[5, 10, 20, 50, 100, 200].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleTip(amount)}
                      className="px-3 py-2 rounded-lg bg-muted hover:bg-amber-500/20 hover:text-amber-500 font-semibold text-sm transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowTipModal(false)}
                    className="flex-1 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 font-medium text-sm"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-3 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 font-medium text-sm">
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Row 2 - Share + Remix */}
        <div className="grid grid-cols-2 gap-2 p-3 border-b border-border relative">
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>

            {/* Share Menu - Below Button (Icons Only) */}
            {showShareMenu && (
              <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-xl shadow-2xl p-2 flex gap-2 z-20">
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
                  title="Copy Link"
                >
                  <Link2 className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
          <a
            href={`/studio/index.html?remix=${encodeURIComponent(video.title)}&sourceId=${video.id}`}
            target="_blank"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Repeat2 className="h-4 w-4" />
            Remix
          </a>
        </div>

        {/* More Menu */}
        <div className="relative p-3">
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm bg-muted text-foreground hover:bg-muted/80 transition-colors"
          >
            <MoreHorizontal className="h-4 w-4" />
            More
          </button>

          {/* More Menu - Below Button */}
          {showMoreMenu && (
            <div className="absolute top-full left-3 right-3 mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-20">
              <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-red-500">
                <Flag className="h-4 w-4" />
                Report
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
