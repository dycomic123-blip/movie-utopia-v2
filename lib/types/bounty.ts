// 悬赏类型定义

export interface BountyItem {
  id: string
  title: string
  description: string
  reward: number // Credits奖励
  deadline: Date
  author: {
    id: string
    name: string
    avatar: string
  }
  applicants: number // 申请人数
  status: 'open' | 'in-progress' | 'completed'
  tags: string[]
  thumbnail?: string
  difficulty: 'easy' | 'medium' | 'hard'
}
