import { PostCard as PostCardType } from '@/lib/types/community'
import { MessageCircle, Heart, Share2, BadgeCheck, Pin } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

interface PostCardProps {
  post: PostCardType
}

export function PostCard({ post }: PostCardProps) {
  // 计算发布时间
  const timeAgo = () => {
    const now = new Date()
    const diff = now.getTime() - post.createdAt.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (days > 0) return `${days}天前`
    if (hours > 0) return `${hours}小时前`
    return '刚刚'
  }

  return (
    <Link href={`/community/post/${post.id}`}>
      <article className="group relative overflow-hidden rounded-xl bg-card cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* 渐变边框效果 - 蓝色系 */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative bg-card/90 backdrop-blur-sm">
          {/* 置顶标签 */}
          {post.isPinned && (
            <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-bl-lg flex items-center gap-1">
              <Pin className="w-3 h-3" />
              置顶
            </div>
          )}

          {/* 如果有缩略图 */}
          {post.thumbnail && (
            <div className="relative w-full h-48 overflow-hidden bg-muted">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          )}

          <div className="p-5">
            {/* 作者信息 */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10 border-2 border-white/10 ring-2 ring-cyan-500/20">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-white">{post.author.name}</span>
                  {post.author.verified && (
                    <BadgeCheck className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{timeAgo()}</span>
              </div>

              {/* 分类标签 */}
              <div className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <MessageCircle className="w-4 h-4 text-cyan-400" />
              </div>
            </div>

            {/* 标题和摘要 */}
            <h3 className="text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
              {post.excerpt}
            </p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-md bg-white/5 text-xs text-white/70 hover:bg-white/10 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* 互动数据 */}
            <div className="flex items-center gap-5 pt-4 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-white/80 hover:text-red-400 transition-colors cursor-pointer">
                <Heart className="w-4 h-4" />
                <span className="text-xs font-medium">{post.likes.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-1.5 text-white/80 hover:text-cyan-400 transition-colors cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-medium">{post.comments.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-1.5 text-white/80 hover:text-amber-400 transition-colors cursor-pointer">
                <Share2 className="w-4 h-4" />
                <span className="text-xs font-medium">{post.shares.toLocaleString()}</span>
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* CTA按钮 */}
              <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40">
                查看讨论
              </button>
            </div>
          </div>
        </div>

        {/* 发光效果 */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
      </article>
    </Link>
  )
}
