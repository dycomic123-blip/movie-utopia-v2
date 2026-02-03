'use client'

import { useState } from 'react'
import { Creator } from '@/lib/types/video'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, TrendingUp, DollarSign, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

type LeaderboardType = 'remixes' | 'tips' | 'likes'

interface LeaderboardCardTabsProps {
  creators: Creator[]
}

function getRankColor(rank: number): string {
  switch (rank) {
    case 1:
      return 'text-yellow-500'
    case 2:
      return 'text-gray-400'
    case 3:
      return 'text-amber-700'
    default:
      return 'text-muted-foreground'
  }
}

function getRankBadge(rank: number) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return `#${rank}`
}

export function LeaderboardCardTabs({ creators }: LeaderboardCardTabsProps) {
  const [activeTab, setActiveTab] = useState<LeaderboardType>('remixes')
  const [isExpanded, setIsExpanded] = useState(false)

  const config = {
    remixes: {
      title: "Top Creators",
      icon: Trophy,
      color: "amber",
      getValue: (c: Creator) => c.remixCount,
      formatValue: (v: number) => `${v.toLocaleString()} remixes`,
      gradient: "from-amber-500/10"
    },
    tips: {
      title: "Top Tippers",
      icon: DollarSign,
      color: "yellow",
      getValue: (c: Creator) => c.totalTips,
      formatValue: (v: number) => `$${v.toLocaleString()}`,
      gradient: "from-yellow-500/10"
    },
    likes: {
      title: "Most Liked",
      icon: Heart,
      color: "red",
      getValue: (c: Creator) => c.totalLikes,
      formatValue: (v: number) => `${v.toLocaleString()} likes`,
      gradient: "from-red-500/10"
    }
  }

  const { title, icon: Icon, getValue, formatValue, gradient } = config[activeTab]

  // Sort by rank (already sorted in mock data)
  const displayCount = isExpanded ? 10 : 5
  const sortedCreators = creators.slice(0, displayCount)

  return (
    <article className={cn(
      "group relative overflow-hidden rounded-xl cursor-default shadow-md hover:shadow-xl transition-all duration-300",
      "bg-gradient-to-br via-card to-card",
      gradient,
      activeTab === 'tips' && "border border-yellow-500/20",
      activeTab === 'likes' && "border border-red-500/20",
      activeTab === 'remixes' && "border border-amber-500/20"
    )}>
      <div className="p-6">
        {/* Tab Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>

          {/* Tab Icons */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('remixes')}
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-lg transition-all",
                activeTab === 'remixes'
                  ? "bg-amber-500/20 text-amber-500 shadow-sm"
                  : "bg-background/50 text-muted-foreground hover:bg-background/80"
              )}
              title="Top Remixers"
            >
              <Trophy className="h-4 w-4" />
            </button>

            <button
              onClick={() => setActiveTab('tips')}
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-lg transition-all",
                activeTab === 'tips'
                  ? "bg-yellow-500/20 text-yellow-500 shadow-sm"
                  : "bg-background/50 text-muted-foreground hover:bg-background/80"
              )}
              title="Top Earners"
            >
              <DollarSign className="h-4 w-4" />
            </button>

            <button
              onClick={() => setActiveTab('likes')}
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-lg transition-all",
                activeTab === 'likes'
                  ? "bg-red-500/20 text-red-500 shadow-sm"
                  : "bg-background/50 text-muted-foreground hover:bg-background/80"
              )}
              title="Most Liked"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Period Badge */}
        <div className="flex items-center gap-1.5 mb-4 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          <span>Last 30 days</span>
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {sortedCreators.map((creator, index) => (
            <div
              key={creator.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer group/item"
            >
              {/* Rank Badge */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-card border border-border">
                <span className={cn('text-sm font-bold', getRankColor(creator.rank))}>
                  {creator.rank <= 3 ? getRankBadge(creator.rank) : creator.rank}
                </span>
              </div>

              {/* Avatar */}
              <Avatar className={cn(
                "h-10 w-10 border-2 border-border ring-2 ring-transparent transition-all",
                activeTab === 'tips' && "group-hover/item:ring-yellow-500/30",
                activeTab === 'likes' && "group-hover/item:ring-red-500/30",
                activeTab === 'remixes' && "group-hover/item:ring-amber-500/30"
              )}>
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name[0]}</AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-semibold text-foreground truncate transition-colors",
                  activeTab === 'tips' && "group-hover/item:text-yellow-500",
                  activeTab === 'likes' && "group-hover/item:text-red-500",
                  activeTab === 'remixes' && "group-hover/item:text-amber-500"
                )}>
                  {creator.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatValue(getValue(creator))}
                </p>
              </div>

              {/* Trend indicator */}
              {creator.rank <= 3 && (
                <TrendingUp className="h-4 w-4 text-green-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
              )}
            </div>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        {creators.length > 5 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "w-full mt-4 py-2 text-sm font-medium transition-colors",
              activeTab === 'tips' && "text-yellow-500 hover:text-yellow-400",
              activeTab === 'likes' && "text-red-500 hover:text-red-400",
              activeTab === 'remixes' && "text-amber-500 hover:text-amber-400"
            )}
          >
            {isExpanded ? '← Show Less' : 'View Top 10 →'}
          </button>
        )}
      </div>

      {/* Decorative gradient */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -z-10 transition-colors duration-500",
        activeTab === 'tips' && "bg-yellow-500/10",
        activeTab === 'likes' && "bg-red-500/10",
        activeTab === 'remixes' && "bg-amber-500/10"
      )} />
    </article>
  )
}
