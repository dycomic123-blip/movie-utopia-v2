import Link from 'next/link'
import { MessageCircle, Heart, Share2 } from 'lucide-react'

// Generate static params for all posts
export function generateStaticParams() {
  return [
    { id: 'post-1' },
    { id: 'post-2' },
    { id: 'post-3' },
    { id: 'post-4' },
  ]
}

export default function PostPage({ params }: { params: { id: string } }) {
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

        {/* 帖子详情占位符 */}
        <div className="bg-card rounded-xl p-8 border border-white/10">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                社区帖子详情页面
              </h1>
              <p className="text-muted-foreground">
                帖子 ID: {params.id}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-white/80">
            <p>💬 这是社区帖子详情页面的占位符</p>
            <p>📝 将在后续版本中完善以下功能：</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>完整的帖子内容展示</li>
              <li>富文本编辑器支持（图片、视频、代码块）</li>
              <li>评论系统（嵌套回复）</li>
              <li>点赞和收藏功能</li>
              <li>作者个人资料卡片</li>
              <li>相关推荐帖子</li>
              <li>分享到社交媒体</li>
            </ul>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex gap-4">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors">
              <Heart className="w-4 h-4" />
              点赞
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
              <MessageCircle className="w-4 h-4" />
              评论
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/20 text-amber-400 hover:bg-amber-500/10 transition-colors">
              <Share2 className="w-4 h-4" />
              分享
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
