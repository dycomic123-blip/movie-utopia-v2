// 社区相关类型定义

export interface ChallengeCard {
  type: 'challenge'
  id: string
  title: string
  description: string
  participants: number
  reward: number // Credits奖励
  deadline: Date
  thumbnails: string[] // 参与作品缩略图（3-4张）
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface PostCard {
  type: 'post'
  id: string
  author: {
    id: string
    name: string
    avatar: string
    verified: boolean
  }
  title: string
  excerpt: string
  likes: number
  comments: number
  shares: number
  thumbnail?: string // 可选的帖子配图
  tags: string[]
  createdAt: Date
  isPinned?: boolean // 是否置顶
}

export type CommunityItem = ChallengeCard | PostCard
