import { Creator } from '@/lib/types/video'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LeaderboardWidgetProps {
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

function CreatorItem({ creator }: { creator: Creator }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent/50 transition-colors">
      <span className={cn('text-sm font-bold w-5 text-center', getRankColor(creator.rank))}>
        {creator.rank}
      </span>
      <Avatar className="h-8 w-8 border border-border">
        <AvatarImage src={creator.avatar} alt={creator.name} />
        <AvatarFallback>{creator.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">{creator.name}</p>
        <p className="text-[10px] text-muted-foreground">
          {creator.remixCount.toLocaleString()} remixes
        </p>
      </div>
    </div>
  )
}

function CreatorItemCompact({ creator }: { creator: Creator }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[100px] p-3 rounded-lg hover:bg-accent/50 transition-colors">
      <div className="relative">
        <Avatar className="h-14 w-14 border-2 border-border">
          <AvatarImage src={creator.avatar} alt={creator.name} />
          <AvatarFallback>{creator.name[0]}</AvatarFallback>
        </Avatar>
        <span
          className={cn(
            'absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-background border-2 border-border text-xs font-bold',
            getRankColor(creator.rank)
          )}
        >
          {creator.rank}
        </span>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground truncate max-w-[90px]">
          {creator.name}
        </p>
        <p className="text-xs text-muted-foreground whitespace-nowrap">
          {creator.remixCount.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export function LeaderboardWidget({ creators }: LeaderboardWidgetProps) {
  return (
    <aside
      className="overflow-x-auto"
      aria-label="Top creators leaderboard"
    >
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="h-5 w-5 text-amber-500 flex-shrink-0" />
        <h2 className="text-lg font-semibold text-foreground whitespace-nowrap">Top Creators (30d)</h2>
      </div>
      <div className="flex gap-3 pb-2">
        {creators.map((creator) => (
          <CreatorItemCompact key={creator.id} creator={creator} />
        ))}
      </div>
    </aside>
  )
}
