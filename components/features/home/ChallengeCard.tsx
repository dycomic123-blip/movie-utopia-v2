import { ChallengeCard as ChallengeCardType } from '@/lib/types/community'
import { Trophy, Users, Clock, Zap } from 'lucide-react'
import Link from 'next/link'

interface ChallengeCardProps {
  challenge: ChallengeCardType
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  // 计算剩余天数
  const daysLeft = Math.ceil((challenge.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  // 难度颜色映射
  const difficultyColors = {
    easy: 'text-green-400 bg-green-500/10 border-green-500/20',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    hard: 'text-red-400 bg-red-500/10 border-red-500/20',
  }

  const difficultyLabels = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
  }

  return (
    <Link href={`/challenge/${challenge.id}`}>
      <article className="group relative overflow-hidden rounded-xl bg-card cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* 渐变边框效果 */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative bg-card/90 backdrop-blur-sm p-5">
          {/* 头部：图标 + 标签 */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2.5 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">AI视频挑战</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[challenge.difficulty]}`}>
                  <Zap className="w-3 h-3" />
                  {difficultyLabels[challenge.difficulty]}
                </span>
              </div>
            </div>

            {/* 倒计时 */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-medium text-white">{daysLeft}天</span>
            </div>
          </div>

          {/* 标题和描述 */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-violet-400 transition-colors">
            {challenge.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {challenge.description}
          </p>

          {/* 缩略图网格 */}
          <div className="grid grid-cols-4 gap-1.5 mb-4">
            {challenge.thumbnails.slice(0, 4).map((thumbnail, index) => (
              <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                <img
                  src={thumbnail}
                  alt={`参与作品 ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {challenge.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-white/5 text-xs text-white/70 hover:bg-white/10 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 底部信息栏 */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-white/80">
                <Users className="w-4 h-4 text-violet-400" />
                <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                <span className="text-muted-foreground">参与</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/80">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span className="font-medium text-amber-400">{challenge.reward}</span>
                <span className="text-muted-foreground">Credits</span>
              </div>
            </div>

            {/* CTA按钮 */}
            <button className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-semibold hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40">
              参加挑战
            </button>
          </div>
        </div>

        {/* 发光效果 */}
        <div className="absolute inset-0 bg-gradient-to-t from-violet-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
      </article>
    </Link>
  )
}
