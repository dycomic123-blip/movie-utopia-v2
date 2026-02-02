import Link from 'next/link'
import { DollarSign, Users, Clock } from 'lucide-react'

// Generate static params for all bounties
export function generateStaticParams() {
  return [
    { id: 'bounty-1' },
    { id: 'bounty-2' },
    { id: 'bounty-3' },
    { id: 'bounty-4' },
    { id: 'bounty-5' },
  ]
}

export default function BountyPage({ params }: { params: { id: string } }) {
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

        {/* 悬赏详情占位符 */}
        <div className="bg-card rounded-xl p-8 border border-white/10">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                悬赏详情页面
              </h1>
              <p className="text-muted-foreground">
                悬赏 ID: {params.id}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-white/80">
            <p>💰 这是悬赏详情页面的占位符</p>
            <p>📝 将在后续版本中完善以下功能：</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>完整的需求说明和交付要求</li>
              <li>发布者信息和信誉评级</li>
              <li>申请者列表和作品展示</li>
              <li>申请/投标按钮</li>
              <li>悬赏金额和支付流程</li>
              <li>截止日期倒计时</li>
              <li>评审标准和验收流程</li>
              <li>聊天沟通功能</li>
            </ul>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex gap-4">
            <Link
              href="/studio/index.html"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg"
            >
              <DollarSign className="w-5 h-5" />
              申请此悬赏
            </Link>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-all">
              <Users className="w-5 h-5" />
              查看申请者
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
