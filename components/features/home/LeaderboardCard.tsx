import { Creator } from '@/lib/types/video'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, TrendingUp, Coins, Heart, Repeat2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type LeaderboardType = 'remixes' | 'tips' | 'likes'

interface LeaderboardCardProps {
  creators: Creator[]
  type?: LeaderboardType
  title?: string
  period?: string
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

export function LeaderboardCard({
  creators,
  type = 'remixes',
  title,
  period = "30d"
}: LeaderboardCardProps) {
  // 根据类型配置
  const config = {
    remixes: {
      title: title || "Top Creators",
      icon: Trophy,
      color: "amber",
      getValue: (c: Creator) => c.remixCount,
      formatValue: (v: number) => `${v.toLocaleString()} remixes`,
      gradient: "from-amber-500/10"
    },
    tips: {
      title: title || "💰 打赏榜",
      icon: Coins,
      color: "yellow",
      getValue: (c: Creator) => c.totalTips,
      formatValue: (v: number) => `$${v.toLocaleString()}`,
      gradient: "from-yellow-500/10"
    },
    likes: {
      title: title || "❤️ 点赞榜",
      icon: Heart,
      color: "red",
      getValue: (c: Creator) => c.totalLikes,
      formatValue: (v: number) => `${v.toLocaleString()} likes`,
      gradient: "from-red-500/10"
    }
  }

  const { title: displayTitle, icon: Icon, color, getValue, formatValue, gradient } = config[type]

  // 按对应指标排序
  const sortedCreators = [...creators].sort((a, b) => getValue(b) - getValue(a)).slice(0, 5)

  return (
    <article className={cn(
      "group relative overflow-hidden rounded-xl cursor-default shadow-md hover:shadow-xl transition-all duration-300",
      "bg-gradient-to-br via-card to-card",
      gradient,
      type === 'tips' && "border border-yellow-500/20",
      type === 'likes' && "border border-red-500/20",
      type === 'remixes' && "border border-amber-500/20"
    )}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full",
            type === 'tips' && "bg-yellow-500/20",
            type === 'likes' && "bg-red-500/20",
            type === 'remixes' && "bg-amber-500/20"
          )}>
            <Icon className={cn(
              "h-5 w-5",
              type === 'tips' && "text-yellow-500",
              type === 'likes' && "text-red-500",
              type === 'remixes' && "text-amber-500"
            )} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">{displayTitle}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Last {period}
            </p>
          </div>
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
                <span className={cn('text-sm font-bold', getRankColor(index + 1))}>
                  {index < 3 ? getRankBadge(index + 1) : index + 1}
                </span>
              </div>

              {/* Avatar */}
              <Avatar className={cn(
                "h-10 w-10 border-2 border-border ring-2 ring-transparent transition-all",
                type === 'tips' && "group-hover/item:ring-yellow-500/30",
                type === 'likes' && "group-hover/item:ring-red-500/30",
                type === 'remixes' && "group-hover/item:ring-amber-500/30"
              )}>
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback>{creator.name[0]}</AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-semibold text-foreground truncate transition-colors",
                  type === 'tips' && "group-hover/item:text-yellow-500",
                  type === 'likes' && "group-hover/item:text-red-500",
                  type === 'remixes' && "group-hover/item:text-amber-500"
                )}>
                  {creator.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatValue(getValue(creator))}
                </p>
              </div>

              {/* Trend indicator */}
              {index < 3 && (
                <TrendingUp className="h-4 w-4 text-green-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
              )}
            </div>
          ))}
        </div>

        {/* View All Link */}
        <button className={cn(
          "w-full mt-4 py-2 text-sm font-medium transition-colors",
          type === 'tips' && "text-yellow-500 hover:text-yellow-400",
          type === 'likes' && "text-red-500 hover:text-red-400",
          type === 'remixes' && "text-amber-500 hover:text-amber-400"
        )}>
          View Full Leaderboard →
        </button>
      </div>

      {/* Decorative gradient */}
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -z-10",
        type === 'tips' && "bg-yellow-500/10",
        type === 'likes' && "bg-red-500/10",
        type === 'remixes' && "bg-amber-500/10"
      )} />
    </article>
  )
}
