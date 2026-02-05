import Link from 'next/link'
import { Trophy, Zap } from 'lucide-react'

// Generate static params for all challenges
export function generateStaticParams() {
  return [
    { id: 'challenge-1' },
    { id: 'challenge-2' },
    { id: 'challenge-3' },
  ]
}

export default function ChallengePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 返回链接 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-sm text-white/70 hover:text-white transition-colors"
        >
          ← 返回首页
        </Link>

        {/* 挑战详情占位符 */}
        <div className="bg-card rounded-xl p-8 border border-white/10">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                挑战详情页面
              </h1>
              <p className="text-muted-foreground">
                挑战 ID: {params.id}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-white/80">
            <p>🎯 这是挑战详情页面的占位符</p>
            <p>📝 将在后续版本中完善以下功能：</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>完整的挑战说明和规则</li>
              <li>参与作品展示画廊</li>
              <li>提交作品按钮（跳转到Studio并预填充要求）</li>
              <li>评分标准和评审流程</li>
              <li>参与者排行榜</li>
              <li>讨论区域</li>
            </ul>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <Link
              href="/studio/index.html"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:from-violet-500 hover:to-purple-500 transition-all"
            >
              <Zap className="w-4 h-4" />
              开始创作
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
