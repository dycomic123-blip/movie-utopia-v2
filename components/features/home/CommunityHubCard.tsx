'use client'

import { useState } from 'react'
import { ChallengeCard as ChallengeType } from '@/lib/types/community'
import { PostCard as PostType } from '@/lib/types/community'
import { BountyItem } from '@/lib/types/bounty'
import { Trophy, DollarSign, Flame, Clock, Users, Zap, BadgeCheck, Award } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CommunityHubCardProps {
  challenges: ChallengeType[]
  bounties: BountyItem[]
  posts: PostType[]
}

type TabType = 'challenges' | 'bounties' | 'posts'

export function CommunityHubCard({ challenges, bounties, posts }: CommunityHubCardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('challenges')

  const tabs = [
    { id: 'challenges' as TabType, label: 'Challenges', icon: Award, count: challenges.length },
    { id: 'bounties' as TabType, label: 'Bounties', icon: DollarSign, count: bounties.length },
    { id: 'posts' as TabType, label: 'Trending', icon: Flame, count: posts.length },
  ]

  // 计算剩余天数
  const getDaysLeft = (deadline: Date) => {
    return Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  }

  // 计算发布时间
  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (days > 0) return `${days}天前`
    if (hours > 0) return `${hours}小时前`
    return '刚刚'
  }

  const difficultyColors = {
    easy: 'text-green-400 bg-green-500/10',
    medium: 'text-amber-400 bg-amber-500/10',
    hard: 'text-red-400 bg-red-500/10',
  }

  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  }

  const statusColors = {
    open: 'text-green-400 bg-green-500/10',
    'in-progress': 'text-amber-400 bg-amber-500/10',
    completed: 'text-gray-400 bg-gray-500/10',
  }

  const statusLabels = {
    open: 'Open',
    'in-progress': 'In Progress',
    completed: 'Completed',
  }

  return (
    <div className="bg-card rounded-xl border border-white/10 overflow-hidden shadow-xl">
      {/* Tab 切换按钮 */}
      <div className="flex border-b border-white/10 bg-white/[0.02]">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-all relative',
                isActive
                  ? 'text-violet-400 bg-violet-500/10'
                  : 'text-white/60 hover:text-white/90 hover:bg-white/5'
              )}
            >
              <Icon className={cn('w-4 h-4', isActive && 'text-violet-400')} />
              <span>{tab.label}</span>
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded-full text-xs font-semibold',
                  isActive ? 'bg-violet-500/20 text-violet-300' : 'bg-white/10 text-white/50'
                )}
              >
                {tab.count}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500" />
              )}
            </button>
          )
        })}
      </div>

      {/* 内容区域 */}
      <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
        {/* 挑战Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-3">
            {challenges.slice(0, 5).map((challenge) => (
              <Link
                key={challenge.id}
                href={`/challenge/${challenge.id}`}
                className="block group"
              >
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all">
                  {/* 头部 */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-violet-500/20">
                        <Award className="w-3.5 h-3.5 text-violet-400" />
                      </div>
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', difficultyColors[challenge.difficulty])}>
                        {difficultyLabels[challenge.difficulty]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-amber-400">
                      <Clock className="w-3 h-3" />
                      <span>{getDaysLeft(challenge.deadline)}d</span>
                    </div>
                  </div>

                  {/* 标题 */}
                  <h4 className="text-sm font-semibold text-white mb-1.5 line-clamp-2 group-hover:text-violet-400 transition-colors">
                    {challenge.title}
                  </h4>

                  {/* 描述 */}
                  <p className="text-xs text-white/60 line-clamp-2 mb-2">
                    {challenge.description}
                  </p>

                  {/* 底部信息 */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-white/70">
                      <Users className="w-3.5 h-3.5" />
                      <span>{challenge.participants}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 font-medium">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>{challenge.reward} Credits</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 悬赏Tab */}
        {activeTab === 'bounties' && (
          <div className="space-y-3">
            {bounties.slice(0, 5).map((bounty) => (
              <Link
                key={bounty.id}
                href={`/bounty/${bounty.id}`}
                className="block group"
              >
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all">
                  {/* 头部 */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7 border border-white/10">
                        <AvatarImage src={bounty.author.avatar} alt={bounty.author.name} />
                        <AvatarFallback>{bounty.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-medium text-white/80">{bounty.author.name}</span>
                    </div>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', statusColors[bounty.status])}>
                      {statusLabels[bounty.status]}
                    </span>
                  </div>

                  {/* 标题 */}
                  <h4 className="text-sm font-semibold text-white mb-1.5 line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {bounty.title}
                  </h4>

                  {/* 描述 */}
                  <p className="text-xs text-white/60 line-clamp-2 mb-2">
                    {bounty.description}
                  </p>

                  {/* 底部信息 */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-white/70">
                        <Users className="w-3.5 h-3.5" />
                        <span>{bounty.applicants}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/70">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{getDaysLeft(bounty.deadline)}d</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <DollarSign className="w-4 h-4" />
                      <span>{bounty.reward}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 热门帖子Tab */}
        {activeTab === 'posts' && (
          <div className="space-y-3">
            {posts.slice(0, 5).map((post) => (
              <Link
                key={post.id}
                href={`/community/post/${post.id}`}
                className="block group"
              >
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all">
                  {/* 头部 */}
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-7 w-7 border border-white/10">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-white/80 truncate">{post.author.name}</span>
                        {post.author.verified && (
                          <BadgeCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        )}
                      </div>
                      <span className="text-xs text-white/50">{getTimeAgo(post.createdAt)}</span>
                    </div>
                  </div>

                  {/* 标题 */}
                  <h4 className="text-sm font-semibold text-white mb-1.5 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h4>

                  {/* 摘要 */}
                  <p className="text-xs text-white/60 line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>

                  {/* 底部信息 */}
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <div className="flex items-center gap-1">
                      <span>💬</span>
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>❤️</span>
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 查看更多按钮 */}
      <div className="p-3 border-t border-white/10 bg-white/[0.02]">
        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-purple-500 transition-all">
          View All {activeTab === 'challenges' ? 'Challenges' : activeTab === 'bounties' ? 'Bounties' : 'Posts'}
        </button>
      </div>
    </div>
  )
}
