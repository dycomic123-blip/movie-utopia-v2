export interface VideoItem {
  id: string
  title: string
  description?: string
  author: {
    id: string
    name: string
    avatar: string
    followers: number
  }
  thumbnail: string
  videoUrl: string
  genre: 'Action' | 'Drama' | 'Comedy' | 'Sci-Fi' | 'Horror' | 'Romance' | 'Thriller'
  tags?: string[]
  views: number
  likes: number
  comments: number
  tips: number // Total tips received
  aspectRatio: number // 16/9, 9/16, or 21/9
  duration: number
  createdAt: string
  remixParent?: {
    videoId: string
    authorId: string
    authorName: string
  }
}

export interface Creator {
  id: string
  name: string
  avatar: string
  remixCount: number
  totalTips: number      // 总打赏金额
  totalLikes: number     // 总点赞数
  rank: number
}

export interface HeroContent {
  id: string
  title: string
  description: string
  coverImage: string
  videoUrl: string
  videoUrls?: string[] // 支持多个视频循环播放
  genre: string
}
